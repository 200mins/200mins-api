module.exports = function (req, res, next) {

    if (!req.headers.hasOwnProperty('authorization')) {

        return res.stahp('You must be logged-in to do this.');

    } else {

        var token = req.headers.authorization;

        JWTService.verify(token, function (err, token) {

            if (err) {

                return res.kick('Please login again.');

            } else {

                var findUserNeedle = {id: token.id};

                User.findOne(findUserNeedle).exec(function (err, foundUser) {

                    if (err) {

                        return res.serverError(err);

                    } else {

                        if (!foundUser) {

                            return res.kick('Please register again.');

                        } else {

                            if (token.password !== foundUser.password) {

                                return res.kick('Please login again.');

                            } else {

                                req.userID = foundUser.id;

                                return next();

                            }

                        }

                    }

                });

            }

        });

    }

};