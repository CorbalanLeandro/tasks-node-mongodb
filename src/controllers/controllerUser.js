const bcryptjs = require('bcryptjs');
const User = require('../models/User');

module.exports = {
    create: async (req, res) =>{

        let user = new User(req.body);
        user.password = bcryptjs.hashSync(req.body.password, 10);//hashing password
        await user.save(err => console.error(err))
        res.redirect('/');

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
        userToLogin.password = null;
        req.session.user = userToLogin;
        if(req.body.rememberme){
            res.cookie('email', userToLogin.email, { maxAge: 1000 * 60 * 60 * 24 })
        }
        res.redirect('/');

    },
    logOut: (req, res) =>{
        req.session.destroy();
        res.cookie('email', null, { maxAge: -1 });
        res.redirect('/');
    }
}   