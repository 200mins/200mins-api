module.exports = function (req, res, next) {

    var token;

    if (req.headers.hasOwnProperty('authorization')) {

        token = req.headers.authorization;

    } else {

        return res.stahp('You must be logged-in to perform this action.');

    }

    JWTService.verify(token, function (err, token) {

        if (err) {

            return res.stahp('Your session has expired. Please login again.');

        } else {

            var findUserNeedle = {id: token.id};

            User.findOne(findUserNeedle).exec(function (err, foundUser) {

                if (err) {

                    return res.serverError(err);

                } else {

                    if (typeof foundUser === 'undefined') {

                        return res.stahp('We don\'t know you.');

                    } else {

                        if (token.password !== foundUser.password) {

                            return res.stahp('Wrong password.');

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