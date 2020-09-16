const Task = require('../models/Task');

module.exports = {
    create: async (req, res) => {

        const { title, description } = req.body;
        if ((title.trim()).length > 2 && (description.trim()).length > 2){
            let newTask = new Task(req.body);  
            newTask.userId = req.params.userId;      
            await newTask.save(err => console.error(err));
            res.redirect('/');
        } else {
            let error = 'Make segure that the title and the description are longer than 2 caracters';
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

        const { editTitle, editDescription } = req.body;
        if ((editTitle.trim()).length > 2 && (editDescription.trim()).length > 2){
            await Task.findByIdAndUpdate(req.params.id, { title: editTitle, description: editDescription });
            res.redirect('/');
        } else {
            let error = 'Make segure that the title and the description are longer than 2 caracters';
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