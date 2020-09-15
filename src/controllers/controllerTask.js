const Task = require('../models/Task');

module.exports = {
    create: async (req, res) => {
        let newTask = new Task(req.body);  
        newTask.userId = req.params.userId;      
        await newTask.save(err => console.error(err));
        res.redirect('/');
    },
    check: async (req, res) => {
        let taskToCheck = await Task.findById(req.params.id);
        taskToCheck.status = !taskToCheck.status
        await taskToCheck.save()
        res.redirect('/');
    },
    update: async (req, res) => {
        await Task.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/');
    },
    destroy: async (req, res) => {
        await Task.findByIdAndDelete(req.params.id);
        res.redirect('/');
    }
}