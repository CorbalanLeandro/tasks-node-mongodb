const express = require('express');
const router = express.Router();
const path = require('path');

//Importing controller
const controllerWeb = require(path.resolve(__dirname + '../../controllers/controllerWeb'));

router.get('/', controllerWeb.home);

module.exports = router;