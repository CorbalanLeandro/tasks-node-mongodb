const bcryptjs = require('bcryptjs');
const User = require('../models/User');

module.exports = {
    create: async (req, res) =>{

        const { userName, firstName, lastName, email, password, confirmPassword } = req.body;
        const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if((userName.trim()).length > 2 && (firstName.trim()).length > 2 && (lastName.trim()).length > 2 && password == confirmPassword && (password.trim()).length >= 8 && emailRegex.test(email)){
            let user = new User(req.body);
            user.password = bcryptjs.hashSync(req.body.password, 10);//hashing password
            await user.save(err => console.error(err))
            res.redirect('/');
        } else {
            let error = 'There was an error on the registration';
            res.render('./web/home', { error });
            
        }   

    },
    singIn: async(req, res) =>{
        
        const userOrEmail = req.body.userOrEmail; //get the string from the form
        const userToLogin = await User.findOne({
            $or:
                [
                    {userName: new RegExp(`^${userOrEmail}$`, 'i')},
                    {email: new RegExp(`^${userOrEmail}$`, 'i')}
                ]
        })   
        if(userToLogin && bcryptjs.compareSync(req.body.password, userToLogin.password)){
            userToLogin.password = null;
            req.session.user = userToLogin;
            if(req.body.rememberme){
                res.cookie('email', userToLogin.email, { maxAge: 1000 * 60 * 60 * 24 })
            }
            res.redirect('/');
        } else {
            let error = 'Non-existent user or invalid password';
            res.render('./web/home', { error });
        }        

    },
    logOut: (req, res) =>{
        req.session.destroy();
        res.cookie('email', null, { maxAge: -1 });
        res.redirect('/');
    }
}   