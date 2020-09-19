const User = require('../../models/User');


module.exports = async (req,res,next) => {
    res.locals.user = false;   
    if(req.session.user){
        res.locals.user = req.session.user;
        return next();
    } else if(req.cookies.email){
        let useOnCookies = await User.findOne({email:req.cookies.email});
        useOnCookies.password = null;
        req.session.user = undefined;
        res.locals.user = undefined;
        req.session.user = useOnCookies;
        res.locals.user = useOnCookies;
        return next();
    }else {
        next();
    }
}
