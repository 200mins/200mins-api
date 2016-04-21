/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    checkUsername: function (req, res) {

        if (!req.query.hasOwnProperty('username')) {

            return res.badRequest();

        } else {

            var findUserNeedle = {username: req.query.username};

            User.findOne(findUserNeedle).exec(function (err, foundUser) {

                if (err) {

                    return sails.config.environment === 'development' ? res.serverError(err) : res.serverError();

                } else if (typeof foundUser === 'undefined') {

                    var response = {available: true};

                    return res.json(response);

                } else {

                    var response = {available: false};

                    return res.json(response);

                }

            });

        }

    },

    login: function (req, res) {

        if (!req.query.hasOwnProperty('username') || !req.query.hasOwnProperty('password')) {

            return res.badRequest();

        } else {

            var findUserNeedle = {username: req.query.username};

            User.findOne(findUserNeedle).exec(function (err, foundUser) {

                if (err) {

                    return sails.config.environment === 'development' ? res.serverError(err) : res.serverError();

                } else if (typeof foundUser === 'undefined') {

                    return res.forbidden('We don\'t know you.');

                } else {

                    var bcrypt = require('bcrypt');

                    bcrypt.compare(req.query.password, foundUser.password, function (err, isSame) {

                        if (err) {

                            return sails.config.environment === 'development' ? res.serverError(err) : res.serverError();

                        } else {

                            if (!isSame) {

                                return res.forbidden('Wrong password.');

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

                    return sails.config.environment === 'development' ? res.serverError(err) : res.serverError();

                } else {

                    for (var key in result) {

                        if (result[key] !== false) {

                            return res.forbidden('A user with that ' + result[key] + ' exists.');

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

                            return sails.config.environment === 'development' ? res.serverError(err) : res.serverError();

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