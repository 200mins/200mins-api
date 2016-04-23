/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    login: function (req, res) {

        if (!req.query.hasOwnProperty('username') || !req.query.hasOwnProperty('password')) {

            return res.badRequest();

        } else {

            var findUserNeedle = {username: req.query.username};

            User.findOne(findUserNeedle).exec(function (err, foundUser) {

                if (err) {

                    return res.serverError(err);

                } else if (typeof foundUser === 'undefined') {

                    return res.stahp('We don\'t know you.');

                } else {
                    
                    var isPasswordCorrect = CryptoService.encrypt(req.query.password) === foundUser.password;

                    if (!isPasswordCorrect) {

                        return res.stahp('Wrong password.');

                    } else {

                        var response = {
                            token: JWTService.generate({id: foundUser.id, password: foundUser.password}),
                            user: foundUser
                        };

                        return res.json(response);

                    }

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

                    var findUserNeedle = {email: req.body.email};

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
                        email: req.body.email,
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