var crypto = require('crypto');

var algorithm = 'aes-256-ctr';

var secret = '130877aa23902d412b1d8f255d07f733';

module.exports = {

    encrypt: function (str) {

        var cipher = crypto.createCipher(algorithm, secret);

        var crypted = cipher.update(str, 'utf8', 'hex');

        crypted += cipher.final('hex');

        return crypted;

    }

};