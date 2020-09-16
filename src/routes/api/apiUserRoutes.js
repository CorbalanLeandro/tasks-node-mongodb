const express = require('express');
const router = express.Router();
const path = require('path');

//Importing controller
const apiControllerUser = require(path.resolve(__dirname + '../../../controllers/api/apiControllerUser'));

router.get('/list', apiControllerUser.list);

module.exports = router;