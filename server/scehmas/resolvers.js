const { User, Task } = require('../models');

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

    }
};

module.exports = resolvers;
