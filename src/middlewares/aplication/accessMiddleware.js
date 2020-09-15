const User = require('../../models/User');


module.exports = async (req,res,next) => {
    res.locals.user = false;   
    if(req.session.user){
        res.locals.user = req.session.user;
        return next();
    } else if(req.cookies.email){
        let userLogueado = await User.findOne({email:req.cookies.email});
        userLogueado.password = null;
        req.session.user = undefined;
        res.locals.user = undefined;
        req.session.user = userLogueado;
        res.locals.user = userLogueado;
        return next();
    }else {
        next();
    }
}
