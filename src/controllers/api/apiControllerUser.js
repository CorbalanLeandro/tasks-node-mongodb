const path = require('path');
const bcryptjs = require('bcryptjs');
const User = require(path.resolve(__dirname + '../../../models/User'));

module.exports = {
    list: async ( req, res) =>{

        const usersInDb = await User.find();
        let usersToMatch = []
        usersInDb.forEach(user => {
            usersToMatch.push(user.username, user.email);
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