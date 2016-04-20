module.exports = function isAuthorized(req, res, next) {

    var token;

    if (req.headers.hasOwnProperty('authorization')) {

        token = req.headers.authorization;

    } else {

        return res.forbidden('You must be logged-in to perform this action.');

    }

    JWTService.verify(token, function (err, token) {

        if (err) {

            return res.forbidden('Your session has expired. Please login again.');

        } else {

            var needle = { id: token.id };

            User.findOne(needle).exec(function (err, user) {

                if (err) {

                    return res.serverError();

                } else {

                    if (typeof user === 'undefined') {

                        return res.forbidden('We don\'t know you.');

                    } else {

                        var bcrypt = require('bcrypt');

                        bcrypt.compare(token.password, user.password, function (err, isSame) {

                            if (err) {

                                return res.serverError();

                            } else {

                                if (!isSame) {

                                    return res.forbidden('Wrong password.');

                                } else {

                                    return next();

                                }

                            }

                        });

                    }

                }

            });

        }

    });

}