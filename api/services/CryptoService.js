var crypto = require('crypto');

var algorithm = 'aes-256-ctr';

var secret = sails.config.secret;

module.exports = {

    encrypt: function (str) {

        var cipher = crypto.createCipher(algorithm, secret);

        var crypted = cipher.update(str, 'utf8', 'hex');

        crypted += cipher.final('hex');

        return crypted;

    },

    decrypt: function (crypted) {

        var decipher = crypto.createDecipher(algorithm, secret);

        var str = decipher.update(crypted, 'hex', 'utf8');

        str += decipher.final('utf8');

        return str;

    }

};