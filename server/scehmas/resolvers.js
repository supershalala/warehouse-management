const { User, Task } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { signToken } = require('../utils/auth');



const resolvers = {
    Query: {
        users: async () => await User.find(),
        tasks: async () => await Task.find(),
        user: async (parent, { id }) => await User.findById(id),
        task: async (parent, { id }) => await Task.findById(id),
    },
    Mutation: {
        createUser: async (parent, { name, role, phone }) => {
            return await User.create({ name, role, phone });
        },
        createTask: async (parent, { description, assignedTo, dueDate, status }) => {
            return await Task.create({ description, assignedTo, dueDate, status });
        },
        updateUser: async (parent, { id, name, role, phone }) => {
            return await User.findByIdAndUpdate(id, { name, role, phone }, { new: true });
        },
        updateTask: async (parent, { id, description, assignedTo, dueDate, status }) => {
            return await Task.findByIdAndUpdate(id, { description, assignedTo, dueDate, status }, { new: true });
        },
        deleteUser: async (parent, { id }) => {
            return await User.findByIdAndDelete(id);
        },
        deleteTask: async (parent, { id }) => {
            return await Task.findByIdAndDelete(id);
        },

        signUp: async (parent, { name, role, phone, password }) => {
            let user;
            if(role === 'manager') {
                user = await User.create({ name, role, phone, password });
            } else {
                user = await User.create({ name, role, phone });
            }
            const token = signToken(user); 
            return { token, user };
        },
        signIn: async (parent, { phone, password }) => {
            const user = await User.findOne({ phone });
            if (!user) {
                throw new Error('No such user found');
            }

            if (user.role === 'manager') {
                const valid = await bcrypt.compare(password, user.password);
                if (!valid) {
                    throw new Error('Invalid password');
                }
            }

            const token = signToken(user);  
            return { token, user };
        },

    }
};

module.exports = resolvers;
