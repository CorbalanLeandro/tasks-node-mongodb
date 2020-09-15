const express = require('express');
const router = express.Router();
const path = require('path');

//Importing controller
const controllerTask = require(path.resolve(__dirname + '../../controllers/controllerTask'));

router.post('/addTask/:userId', controllerTask.create);
router.put('/check/:id', controllerTask.check);
router.put('/editTask/:id', controllerTask.update);
router.delete('/deleteTask/:id', controllerTask.destroy);

module.exports = router;