const path = require('path');
const Task = require(path.resolve(__dirname + '../../models/Task'));
const { validationResult } = require('express-validator');

module.exports = {
    create: async (req, res) => {

        const errors = validationResult(req);
        const { addTaskTitle, addTaskDescription } = req.body;
        if ( errors.isEmpty() ){
            const newTask = new Task({ title: addTaskTitle, description: addTaskDescription });  
            newTask.userId = req.params.userId;      
            await newTask.save();
            res.redirect('/');
        } else {
            //return res.send(errors.errors)
            const loggedUser = req.session.user
            const userTasks = await Task.find({ userId: loggedUser._id })
            res.render('./web/home', { userTasks, errors: errors.errors });
        }
        
    },
    check: async (req, res) => {

        let taskToCheck = await Task.findById(req.params.id);
        taskToCheck.status = !taskToCheck.status
        await taskToCheck.save()
        res.redirect('/');

    },
    update: async (req, res) => {

        const errors = validationResult(req);
        const { editTaskTitle, editTaskDescription } = req.body;
        if ( errors.isEmpty() ){
            await Task.findByIdAndUpdate(req.params.id, { title: editTaskTitle, description: editTaskDescription });
            res.redirect('/');
        } else {
            const loggedUser = req.session.user
            const userTasks = await Task.find({userId: loggedUser._id})
            res.render('./web/home', { userTasks, errors: errors.errors });
        }        

    },
    destroy: async (req, res) => {

        await Task.findByIdAndDelete(req.params.id);
        res.redirect('/');

    }
}