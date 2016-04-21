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

            var findUserNeedle = {id: token.id};

            User.findOne(findUserNeedle).exec(function (err, foundUser) {

                if (err) {

                    return sails.config.environment === 'development' ? res.serverError(err) : res.serverError();

                } else {

                    if (typeof foundUser === 'undefined') {

                        return res.forbidden('We don\'t know you.');

                    } else {

                        if (token.password !== foundUser.password) {

                            return res.forbidden('Wrong password.');

                        } else {

                            req.body.user = foundUser.id;

                            return next();

                        }

                    }

                }

            });

        }

    });

};