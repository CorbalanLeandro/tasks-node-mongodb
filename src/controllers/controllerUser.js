const path = require('path');
const bcryptjs = require('bcryptjs');
const User = require(path.resolve(__dirname + '../../models/User'));
const { validationResult } = require('express-validator');

module.exports = {

    create: async (req, res) => {

        const errors = validationResult(req);
        const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;        
        if ( errors.isEmpty() ) {             
            const user = new User(req.body);
            user.password = bcryptjs.hashSync(req.body.password, 10);//hashing password
            await user.save();
            const success = 'Sign up successfully';
            res.render('./web/home', { success });
        } else {
            res.render('./web/home', { errors: errors.errors });
        }
    },
    singIn: async (req, res) => {

        const errors = validationResult(req);
        if( errors.isEmpty() ) {
            const { userOrEmail } = req.body; //get the string from the form
            const userToLogin = await User.findOne({
                $or:
                    [
                        { userName: new RegExp(`^${userOrEmail}$`, 'i') },
                        { email: new RegExp(`^${userOrEmail}$`, 'i') },
                    ],
            });        
            userToLogin.password = null;
            req.session.user = userToLogin;
            if (req.body.rememberme) {
                res.cookie('email', userToLogin.email, { maxAge: 1000 * 60 * 60 * 24 });
            }
            res.redirect('/');
        } else {
            res.render('./web/home', { errors: errors.errors });
        }

    },
    logOut: (req, res) => {

        req.session.destroy();
        res.cookie('email', null, { maxAge: -1 });
        res.redirect('/');
        
    },
};
