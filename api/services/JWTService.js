var jwt = require('jsonwebtoken');

var secret = "d009c3abfc0b0c7b814a861a169a276f";

module.exports = {

    generate: function (payload) {

        return jwt.sign(payload, secret);

    },

    verify: function (token, callback) {

        return jwt.verify(token, secret, callback);

    }

};