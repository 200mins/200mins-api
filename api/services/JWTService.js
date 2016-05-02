var jwt = require('jsonwebtoken');

var sessionSecret = sails.config.sessionSecret;

module.exports = {

    generate: function (payload) {

        return jwt.sign(payload, sessionSecret);

    },

    verify: function (token, callback) {

        return jwt.verify(token, sessionSecret, callback);

    }

};