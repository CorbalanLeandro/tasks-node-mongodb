const Task = require('../models/Task');

module.exports = {
    create: async (req, res) => {

        const { addTaskTitle, addTaskDescription } = req.body;
        if ((addTaskTitle.trim()).length > 2 && (addTaskDescription.trim()).length > 2){
            const newTask = new Task({ title: addTaskTitle, description: addTaskDescription });  
            newTask.userId = req.params.userId;      
            await newTask.save(err => console.error(err));
            res.redirect('/');
        } else {
            const error = 'Make segure that the title and the description are longer than 2 caracters';
            const loggedUser = req.session.user
            const userTasks = await Task.find({userId: loggedUser._id})
            res.render('./web/home', {userTasks, error});
        }
        
    },
    check: async (req, res) => {

        let taskToCheck = await Task.findById(req.params.id);
        taskToCheck.status = !taskToCheck.status
        await taskToCheck.save()
        res.redirect('/');

    },
    update: async (req, res) => {

        const { editTaskTitle, editTaskDescription } = req.body;
        if ((editTaskTitle.trim()).length > 2 && (editTaskDescription.trim()).length > 2){
            await Task.findByIdAndUpdate(req.params.id, { title: editTaskTitle, description: editTaskDescription });
            res.redirect('/');
        } else {
            const error = 'Make segure that the title and the description are longer than 2 caracters';
            const loggedUser = req.session.user
            const userTasks = await Task.find({userId: loggedUser._id})
            res.render('./web/home', {userTasks, error});
        }        

    },
    destroy: async (req, res) => {

        await Task.findByIdAndDelete(req.params.id);
        res.redirect('/');

    }
}