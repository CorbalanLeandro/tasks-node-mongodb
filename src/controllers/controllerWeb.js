const path = require('path');
const Task = require('../models/Task');

module.exports = {
    home: async (req, res) =>{
        if(req.session.user){
            const loggedUser = req.session.user
            const userTasks = await Task.find({userId: loggedUser._id})
            res.render('./web/home', {userTasks});
        } else {
            res.render('./web/home');
        }
    }
}   