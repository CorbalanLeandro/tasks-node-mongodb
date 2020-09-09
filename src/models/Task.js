const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: String,
    description: String,
    status: {
        type:Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('tasks', TaskSchema);