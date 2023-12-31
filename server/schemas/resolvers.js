const { User, Task } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { signToken } = require('../utils/auth');
const sendSMS = require('../services/twilioService');

const mongoose = require('mongoose');





const resolvers = {
    Query: {
        users: async () => await User.find(),
        tasks: async () => {
            const tasks = await Task.find().populate('assignedTo').lean();
            return tasks.map(task => ({
                ...task,
                id: task._id.toString(), // map `_id` to `id`
                assignedTo: {
                    ...task.assignedTo,
                    id: task.assignedTo._id.toString() // map `_id` to `id` for User
                }
            }));
        },
        user: async (parent, { id }) => await User.findById(id),
        task: async (parent, { id }) => {
            const task = await Task.findById(id).populate('assignedTo').lean();
            return {
                ...task,
                id: task._id.toString(), // map `_id` to `id`
                assignedTo: {
                    ...task.assignedTo,
                    id: task.assignedTo._id.toString() // map `_id` to `id` for User
                }
            };
        },
    },
    Mutation: {
        createUser: async (parent, { name, role, phone }) => {
            return await User.create({ name, role, phone });
        },
        createTask: async (parent, { description, assignedTo, dueDate, status }) => {
            assignedTo = new mongoose.Types.ObjectId(assignedTo);  // Convert assignedTo to an ObjectId

            const task = await Task.create({ description, assignedTo, dueDate, status });
            
            const user = await User.findById(assignedTo);
            const phoneNumber = user.phone;
            
            sendSMS(
                `New task created: ${description}. Due: ${dueDate}`,
                process.env.TWILIO_US_NUMBER,
                phoneNumber
            );

          
            return {
                ...task.toObject(),  // Convert the MongoDB document to a plain JavaScript object
                id: task._id.toString(),  // Convert the ObjectId to a string
                assignedTo: {
                    ...user.toObject(),  // Convert the MongoDB document to a plain JavaScript object
                    id: user._id.toString()  // Convert the ObjectId to a string
                }
            };
            
        },
        updateUser: async (parent, { id, name, role, phone }) => {
            return await User.findByIdAndUpdate(id, { name, role, phone }, { new: true });
        },
     
        updateTask: async (parent, { id, description, assignedTo, dueDate, status }) => {
            let updates = {};
            if (description !== undefined) updates.description = description;
            if (assignedTo !== undefined) updates.assignedTo = assignedTo;
            if (dueDate !== undefined) updates.dueDate = dueDate;
            if (status !== undefined) updates.status = status;
          

            const previousTask = await Task.findById(id).lean();
            const updatedTask = await Task.findByIdAndUpdate(id, updates, { new: true }).populate('assignedTo');
      
            // Check if the status has changed to "completed" and send a text notification
            if (status === 'completed' && previousTask.status !== 'completed') {
              const user = await User.findById(updatedTask.assignedTo);
              const phoneNumber = user.phone;
              sendSMS(
                `Task "${updatedTask.description}" has been marked as completed.`,
                process.env.TWILIO_US_NUMBER,
                phoneNumber
              );
            }
          
            // Convert the task object to a plain JavaScript object and convert `_id` to `id`
            return {
                ...updatedTask.toObject(),
                id: updatedTask._id.toString(),
                assignedTo: {
                    ...updatedTask.assignedTo.toObject(),
                    id: updatedTask.assignedTo._id.toString()
                }
            };
        },
        

        deleteUser: async (parent, { id }) => {
            return await User.findByIdAndDelete(id);
        },
        deleteTask: async (parent, { id }) => {
            return await Task.findByIdAndDelete(id);
        },

        signUp: async (parent, { name, role, phone, password }) => {
            const user = await User.create({ name, role, phone, password });
            const token = signToken(user); 
            return { token, user };
          },
          
        signIn: async (parent, { phone, password }) => {
            const user = await User.findOne({ phone });
            if (!user) {
              throw new Error('No such user found');
            }
          
            console.log(`Password: ${password}`);
            console.log(`User password: ${user.password}`);
          
            const valid = await bcrypt.compare(password, user.password);
            if (!valid) {
              throw new Error('Invalid password');
            }
          
            const token = signToken(user);
            return { token, user };
          },
    }
};

module.exports = resolvers;
