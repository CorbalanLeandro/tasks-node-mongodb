const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const express = require('express');

const app = express();

//Middlewares
app.use(express.static(path.resolve(__dirname, '..', 'public'))); //public data
app.use(express.urlencoded({extended: false})); //req.body
app.use(morgan('dev'));

//Connecting to db
mongoose.connect('mongodb://localhost/tasks-node-mongodb', {useNewUrlParser: true, useUnifiedTopology:true})
    .then(db => console.log('Database connected'))
    .catch(err => console.error(err))

//Importing routes
const webRoutes = require('./routes/webRoutes');

//Using routes
app.use(webRoutes);

//Settings
app.set('view engine', 'ejs'); //view engine
app.set('port', process.env.PORT || 3000); //port
app.set('views', path.resolve(__dirname, 'views')); //setting views folder


//Server on
app.listen(app.get('port'), () => console.log(`Server running on port ${app.get('port')}`))
