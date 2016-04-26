/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    login: function (req, res) {

        var REQUEST = req.query;

        if (!REQUEST.hasOwnProperty('username') || !REQUEST.hasOwnProperty('password')) {

            return res.badRequest();

        } else {

            var findUserNeedle = {username: REQUEST.username};

            User.findOne(findUserNeedle).exec(function (err, foundUser) {

                if (err) {

                    return res.serverError(err);

                } else if (typeof foundUser === 'undefined') {

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

                                User.update(findUserNeedle, updateUserNeedle).exec(function (err, updatedUsers) {

                                    if (err) {

                                        return res.serverError(err);

                                    } else {

                                        var isPasswordCorrect = CryptoService.encrypt(REQUEST.password) === updatedUsers[0].password;

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

        if (!req.body.hasOwnProperty('email') || !req.body.hasOwnProperty('username') || !req.body.hasOwnProperty('password')) {

            return res.badRequest();

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