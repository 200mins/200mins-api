var jwt = require('jsonwebtoken');

var secret = sails.config.secret;

module.exports = {

    generate: function (payload) {

        return jwt.sign(payload, secret);

    },

    verify: function (token, callback) {

        return jwt.verify(token, secret, callback);

    }

};