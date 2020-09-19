const bcryptjs = require('bcryptjs');
const User = require('../models/User');

module.exports = {

    create: async (req, res) => {

        const { userName, firstName, lastName, email, password, confirmPassword } = req.body;
        const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const usersInDb = await User.find();

        if ((userName.trim()).length > 2 && (firstName.trim()).length > 2 && (lastName.trim()).length > 2 && password == confirmPassword && (password.trim()).length >= 8 && emailRegex.test(email)) {
             const userToMatch = usersInDb.find((user) => { if (user.userName == userName.trim() || user.email == email) { return user; } });
            if (!userToMatch) {
                const user = new User(req.body);
                user.password = bcryptjs.hashSync(req.body.password, 10);//hashing password
                await user.save();
                const success = 'Sign up successfully';
                res.render('./web/home', { success });
            } else {
                const error = 'There was an error on the registration';
                res.render('./web/home', { error });
            }
        } else {
            const error = 'There was an error on the registration';
            res.render('./web/home', { error });
        }
    },
    singIn: async (req, res) => {

        const { userOrEmail } = req.body; //get the string from the form
        const userToLogin = await User.findOne({
            $or:
                [
                    { userName: new RegExp(`^${userOrEmail}$`, 'i') },
                    { email: new RegExp(`^${userOrEmail}$`, 'i') },
                ],
        });
        if (userToLogin && bcryptjs.compareSync(req.body.signInPassword, userToLogin.password)) {
            userToLogin.password = null;
            req.session.user = userToLogin;
            if (req.body.rememberme) {
                res.cookie('email', userToLogin.email, { maxAge: 1000 * 60 * 60 * 24 });
            }
            res.redirect('/');
        } else {
            const error = 'Non-existent user or invalid password';
            res.render('./web/home', { error });
        }

    },
    logOut: (req, res) => {

        req.session.destroy();
        res.cookie('email', null, { maxAge: -1 });
        res.redirect('/');
        
    },
};
