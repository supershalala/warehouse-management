const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dueDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Task', taskSchema);
