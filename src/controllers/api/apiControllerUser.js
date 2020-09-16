const bcryptjs = require('bcryptjs');
const User = require('../../models/User');

module.exports = {
    list: async ( req, res) =>{

        const usersInDb = await User.find();
        let usersToMatch = []
        usersInDb.forEach(user => {
            usersToMatch.push(user.userName, user.email);
        })
        let response = {
            meta:{
                status: 200,
                length: usersToMatch.length,
                url: req.originalUrl
            },
            data: usersToMatch
        }
        res.json(response);

    }
}