const express = require('express');
const router = express.Router();
const path = require('path');
const usersValidator = require(path.resolve(__dirname +'../../middlewares/route/usersValidator'));

//Importing controller
const controllerUser = require(path.resolve(__dirname + '../../controllers/controllerUser'));

router.post('/signUp', usersValidator.signUp, controllerUser.create);
router.post('/signIn', usersValidator.signIn, controllerUser.signIn);
router.get('/logOut', controllerUser.logOut);

module.exports = router;