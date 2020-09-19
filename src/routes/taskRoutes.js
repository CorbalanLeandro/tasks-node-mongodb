const express = require('express');
const router = express.Router();
const path = require('path');
const taskValidator = require(path.resolve(__dirname + '../../middlewares/route/tasksValidator'));

//Importing controller
const controllerTask = require(path.resolve(__dirname + '../../controllers/controllerTask'));

router.post('/addTask/:userId', taskValidator.newTask, controllerTask.create);
router.put('/check/:id', controllerTask.check);
router.put('/editTask/:id', taskValidator.editTask, controllerTask.update);
router.delete('/deleteTask/:id', controllerTask.destroy);

module.exports = router;