/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    getMovieLike: function (req, res) {},

    getMovieWatchLater: function (req, res) {},

    getMovieWatched: function (req, res) {},

    getSession: function (req, res) {

        var username = req.param.username;

        var password = req.query.password;

        // TODO: Check if req.param.username check is required

        if (!password || !username) {

            return res.badRequest('password || username');

        } else {

            var findUserNeedle = {username: username};

            User.findOne(findUserNeedle).exec(function (err, foundUser) {

                if (err) {

                    return res.serverError(err);

                } else if (!foundUser) {

                    return res.stahp('We don\'t know you.');

                } else {

                    var karma = 0;

                    var findActivitiesNeedle = {user: foundUser.id};

                    Activity.find(findActivitiesNeedle).exec(function (err, foundActivities) {

                        if (err) {

                            return res.serverError(err);

                        } else {

                            async.each(foundActivities, function (foundActivity, callback) {

                                karma += foundActivity.karmaDelta;

                                callback(null);

                            }, function () {

                                var updateUserNeedle = {karma: karma};

                                // TODO: Check if updating updates one or all keys

                                User.update(findUserNeedle, updateUserNeedle).exec(function (err, updatedUsers) {

                                    if (err) {

                                        return res.serverError(err);

                                    } else {

                                        var isPasswordCorrect = CryptoService.encrypt(password) === updatedUsers[0].password;

                                        if (!isPasswordCorrect) {

                                            return res.stahp('Wrong password.');

                                        } else {

                                            var response = {
                                                token: JWTService.generate({id: updatedUsers[0].id, password: updatedUsers[0].password}),
                                                user: updatedUsers[0]
                                            };

                                            return res.json(response);

                                        }

                                    }

                                });

                            });

                        }

                    });

                }

            });

        }

    },

    register: function (req, res) {

        if (!req.body.hasOwnProperty('email') || !req.body.hasOwnProperty('password') || !req.body.hasOwnProperty('username')) {

            return res.badRequest('email || password || username');

        } else {

            async.parallel({

                findUserByEmail: function (callback) {

                    var findUserNeedle = {email: CryptoService.encrypt(req.body.email)};

                    User.findOne(findUserNeedle).exec(function (err, foundUser) {

                        if (err) {

                            callback(err);

                        } else if (typeof foundUser === 'undefined') {

                            callback(null, false);

                        } else {

                            callback(null, 'email');

                        }

                    });

                },

                findUserByUsername: function (callback) {

                    var findUserNeedle = {username: req.body.username};

                    User.findOne(findUserNeedle).exec(function (err, foundUser) {

                        if (err) {

                            callback(err);

                        } else if (typeof foundUser === 'undefined') {

                            callback(null, false);

                        } else {

                            callback(null, 'username');

                        }

                    });

                }

            }, function (err, result) {

                if (err) {

                    return res.serverError(err);

                } else {

                    for (var key in result) {

                        if (result[key] !== false) {

                            return res.stahp('A user with that ' + result[key] + ' exists.');

                        }

                    }

                    var createUserNeedle = {
                        email: CryptoService.encrypt(req.body.email),
                        username: req.body.username,
                        password: req.body.password,
                        avatar: 'https://api.adorable.io/avatars/285/' + req.body.username
                    };

                    User.create(createUserNeedle).exec(function (err, createdUser) {

                        if (err) {

                            return res.serverError(err);

                        } else {

                            var response = {
                                token: JWTService.generate({id: createdUser.id, password: createdUser.password}),
                                user: createdUser
                            };

                            return res.json(response);

                        }

                    });

                }

            });

        }

    }

};