const express = require('express');
const router = express.Router();
const path = require('path');

//Importing controller
const controllerUser = require(path.resolve(__dirname + '../../controllers/controllerUser'));

router.post('/singUp', controllerUser.create);
router.post('/singIn', controllerUser.singIn);
router.get('/logOut', controllerUser.logOut);

module.exports = router;