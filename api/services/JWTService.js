var jwt = require('jsonwebtoken');

var sessionSecret = sails.config.jwtSecret;

module.exports = {

    generate: function (payload) {

        return jwt.sign(payload, sessionSecret);

    },

    verify: function (token, callback) {

        return jwt.verify(token, sessionSecret, callback);

    }

};