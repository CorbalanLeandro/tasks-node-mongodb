const path = require('path');
const User = require(path.resolve(__dirname + '../../../models/User'));
const bcryptjs = require('bcryptjs');
const { check } = require('express-validator');

module.exports = {
    signIn: [
        check('userOrEmail').custom( async (value, { req } ) => {
            const signInPassword = req.body.signInPassword;
            const userToLogin = await User.findOne({
                $or:
                    [
                        { username: new RegExp(`^${value}$`, 'i') },
                        { email: new RegExp(`^${value}$`, 'i') },
                    ],
            });
            if ( userToLogin && bcryptjs.compareSync(signInPassword, userToLogin.password) ) {
                return true;
            }
            return Promise.reject('Non-existent user or invalid password');
        })
    ],
    signUp: [
        check('username')
            .isLength({ min: 2 }).withMessage('The username must have al least 2 characters')
            .isLength({ max: 15 }).withMessage('The username must shorter than 15 characters')
            .custom( value =>{
                const usernameRegex = /^\w*$/g
                if( usernameRegex.test(value) ) {
                    return true
                } else {
                    return false
                }
            }).withMessage('The username must be alphanumeric or underscore and no spaces')
            .custom( async value => {
                const userToSignUp = await User.findOne({ username: new RegExp(`^${value}$`, 'i') })
                if( userToSignUp ) {
                    return Promise.reject('The username is already in use');
                } else {
                    return true
                }
            }),
        check('firstName').not().isEmpty().withMessage('The firstname cannot be empty'),
        check('firstName')
            .isLength({ min: 2 }).withMessage('The firstname must have al least 2 characters')
            .isLength({ max: 50 }).withMessage('The firstname must shorter than 50 characters'),
        check('lastName').not().isEmpty().withMessage('The lastname cannot be empty'),
        check('lastName')
            .isLength({ min: 2 }).withMessage('The lastname must have al least 2 characters')
            .isLength({ max: 50 }).withMessage('The lastname must shorter than 50 characters'),
        check('email').isEmail().normalizeEmail().withMessage('Must be a valid email'),
        check('email').custom( async value => {
            const userToSignUp = await User.findOne({ email: new RegExp(`^${value}$`, 'i') })
                if( userToSignUp ) {
                    return Promise.reject('The email is already in use');
                } else {
                    return true
                }
        }),
        check('password').isLength({ min: 8 }).withMessage('The password must have at least 8 characters'),
        check('confirmPassword').custom( (value, { req }) =>{
            const password = req.body.password
            if ( value != password){
                return false
            }
            return true
        }).withMessage('The passwords does not match')
    ]
}