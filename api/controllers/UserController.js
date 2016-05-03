/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    create: function (req, res) {

        // TODO: Add validations

        if (!req.body.hasOwnProperty('email') || !req.body.hasOwnProperty('password') || !req.body.hasOwnProperty('username')) {

            return res.badRequest('email || password || username');

        } else {

            async.parallel({

                findUserByEmail: function (callback) {

                    var findUserNeedle = {email: CryptoService.encrypt(req.body.email)};

                    User.findOne(findUserNeedle).exec(function (err, foundUser) {

                        if (err) {

                            callback(err);

                        } else if (!foundUser) {

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

                        } else if (!foundUser) {

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

                        if (result[key]) {

                            return res.stahp('A user with that ' + result[key] + ' exists.');

                        }

                    }

                    // Create user

                    var createUserNeedle = {
                        avatar: 'https://api.adorable.io/avatars/285/' + req.body.username,
                        email: CryptoService.encrypt(req.body.email),
                        password: req.body.password,
                        username: req.body.username
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

    },

    getMovieDownload: function(req, res){

        // TODO: Add pagination

        // Set variables

        var userID = req.userID;

        // Find activities

        var findActivityNeedle = {
            code: 'movie-download',
            user: userID
        };

        Activity.find(findActivityNeedle).populate('movie').exec(function (err, foundActivities) {

            if (err) {

                return res.serverError(err);

            } else {

                return res.json(foundActivities);

            }

        });

    },

    getMovieLike: function (req, res) {

        // TODO: Add pagination

        // Set variables

        var userID = req.userID;

        // Find activities

        var findActivityNeedle = {
            code: 'movie-like',
            user: userID
        };

        Activity.find(findActivityNeedle).populate('movie').exec(function (err, foundActivities) {

            if (err) {

                return res.serverError(err);

            } else {

                return res.json(foundActivities);

            }

        });

    },

    getMovieMarkWatchLater: function (req, res) {

        // TODO: Add pagination

        // Set variables

        var userID = req.userID;

        // Find activities

        var findActivityNeedle = {
            code: 'movie-watch-later',
            user: userID
        };

        Activity.find(findActivityNeedle).populate('movie').exec(function (err, foundActivities) {

            if (err) {

                return res.serverError(err);

            } else {

                return res.json(foundActivities);

            }

        });

    },

    getMovieMarkWatched: function (req, res) {

        // TODO: Add pagination

        // Set variables

        var userID = req.userID;

        // Find activities

        var findActivityNeedle = {
            code: 'movie-watched',
            user: userID
        };

        Activity.find(findActivityNeedle).populate('movie').exec(function (err, foundActivities) {

            if (err) {

                return res.serverError(err);

            } else {

                return res.json(foundActivities);

            }

        });

    },

    getMoviePlay: function(req, res){

        // TODO: Add pagination

        // Set variables

        var userID = req.userID;

        // Find activities

        var findActivityNeedle = {
            code: 'movie-play',
            user: userID
        };

        Activity.find(findActivityNeedle).populate('movie').exec(function (err, foundActivities) {

            if (err) {

                return res.serverError(err);

            } else {

                return res.json(foundActivities);

            }

        });

    },

    getSession: function (req, res) {

        // Set variables

        var password = req.query.password;

        var userID = req.userID;

        // Validate request

        if (!password) {

            return res.badRequest('password');

        } else {

            // Calculate karma

            var karma = 0;

            var findActivitiesNeedle = {user: userID};

            Activity.find(findActivitiesNeedle).exec(function (err, foundActivities) {

                if (err) {

                    return res.serverError(err);

                } else {

                    async.each(foundActivities, function (foundActivity, callback) {

                        karma += foundActivity.karmaDelta;

                        callback(null);

                    }, function () {

                        // Update user

                        var updateUserNeedle = {karma: karma};

                        User.update(userID, updateUserNeedle).exec(function (err, updatedUsers) {

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

    }

};