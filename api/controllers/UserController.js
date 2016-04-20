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

            var needle = { username: req.query.username };

            User.findOne(needle).exec(function (err, user) {

                if (err) {

                    return res.serverError();

                } else if (typeof user === 'undefined') {

                    var response = { available: true };

                    return res.json(response);

                } else {

                    var response = { available: false };

                    return res.json(response);

                }

            });

        }

    },

    login: function (req, res) {

        if (!req.query.hasOwnProperty('username') || !req.query.hasOwnProperty('password')) {

            return res.badRequest();

        } else {

            var needle = { username: req.query.username };

            User.findOne(needle).exec(function (err, user) {

                if (err) {

                    return res.serverError();

                } else if (typeof user === 'undefined') {

                    return res.forbidden('We don\'t know you.');

                } else {

                    var bcrypt = require('bcrypt');

                    bcrypt.compare(req.query.password, user.password, function (err, isSame) {

                        if (err) {

                            return res.serverError();

                        } else {

                            if (!isSame) {

                                return res.forbidden('Wrong password.');

                            } else {

                                var response = {
                                    token: JWTService.generate({ id: user.id, password: user.password }),
                                    user: user
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

        if (!req.body.hasOwnProperty('username') || !req.body.hasOwnProperty('password')) {

            return res.badRequest();

        } else {

            var needle = {
                username: req.body.username,
                password: req.body.password,
                avatar: 'https://api.adorable.io/avatars/285/' + req.body.username
            };

            User.create(needle).exec(function (err, user) {

                if (err) {

                    return res.serverError();

                } else {

                    var response = {
                        token: JWTService.generate({ id: user.id, password: user.password }),
                        user: user
                    };

                    return res.json(response);

                }

            });

        }

    }

};