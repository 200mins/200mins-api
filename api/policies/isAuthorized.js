module.exports = function (req, res, next) {

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

                    return sails.config.environment === 'development' ? res.serverError(err) : res.serverError();

                } else {

                    if (typeof user === 'undefined') {

                        return res.forbidden('We don\'t know you.');

                    } else {

                        if (token.password !== user.password) {

                            return res.forbidden();

                        } else {

                            req.body.user = user.id;

                            return next();

                        }

                    }

                }

            });

        }

    });

}