/**
 * ActivityController
 *
 * @description :: Server-side logic for managing activities
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    download: function (req, res) {

        if (!req.body.hasOwnProperty('quality')) {

            return res.badRequest();

        } else {

            var quality = req.body.quality.toUpperCase();

            if (!(quality === '3D' || quality === '720P' || quality === '1080P')) {

                return res.badRequest();

            } else {

                var code = 'd';

                var findActivityNeedle = {
                    activity: {
                        code: code,
                        reference: quality
                    },
                    movie: req.body.movie,
                    user: req.body.user
                };

                Activity.findOne(findActivityNeedle).exec(function (err, foundActivity) {

                    if (err) {

                        return res.serverError(err);

                    } else if (typeof foundActivity !== 'undefined') {

                        return res.ok();

                    } else {

                        var createActivityNeedle = {
                            activity: {
                                code: code,
                                points: sails.config.ACTIVITIES[code].points,
                                reference: quality,
                                string: sails.config.ACTIVITIES[code].string
                            },
                            movie: req.body.movie,
                            user: req.body.user
                        };

                        Activity.create(createActivityNeedle).exec(function (err, createdActivity) {

                            if (err) {

                                return res.serverError(err);

                            } else {

                                res.ok();

                            }

                        });

                    }

                });

            }

        }

    },

    like: function (req, res) {

        var code = 'l';

        var findActivityNeedle = {
            activity: {
                code: code
            },
            movie: req.body.movie,
            user: req.body.user
        };

        Activity.findOne(findActivityNeedle).exec(function (err, foundActivity) {

            if (err) {

                return res.serverError(err);

            } else if (typeof foundActivity !== 'undefined') {

                return res.stahp('You have already liked this movie.');

            } else {

                var createActivityNeedle = {
                    activity: {
                        code: code,
                        points: sails.config.ACTIVITIES[code].points,
                        reference: null,
                        string: sails.config.ACTIVITIES[code].string
                    },
                    movie: req.body.movie,
                    user: req.body.user
                };

                Activity.create(createActivityNeedle).exec(function (err, createdActivity) {

                    if (err) {

                        return res.serverError(err);

                    } else {

                        res.ok();

                    }

                });

            }

        });

    },

    unlike: function (req, res) {

        var findActivityNeedle = {
            activity: {code: 'l'},
            movie: req.body.movie,
            user: req.body.user
        };

        Activity.findOne(findActivityNeedle).exec(function (err, foundActivity) {

            if (err) {

                return res.serverError(err);

            } else if (typeof foundActivity === 'undefined') {

                return res.stahp('You haven\'t liked this movie.');

            } else {

                Activity.destroy(findActivityNeedle).exec(function (err) {

                    if (err) {

                        return res.serverError(err);

                    } else {

                        return res.ok();

                    }

                });

            }

        });

    },

    markWatch: function (req, res) {

        var code = 'wn';

        var findActivityNeedle = {
            activity: {code: code},
            movie: req.body.movie,
            user: req.body.user
        };

        Activity.findOne(findActivityNeedle).exec(function (err, foundActivity) {

            if (err) {

                return res.serverError(err);

            } else if (foundActivity !== 'undefined') {

                return res.stahp('You have already marked this to watch.');

            } else {

                var createActivityNeedle = {
                    activity: {
                        code: code,
                        points: sails.config.ACTIVITIES[code].points,
                        reference: null,
                        string: sails.config.ACTIVITIES[code].string
                    },
                    movie: req.body.movie,
                    user: req.body.user
                };

                Activity.create(createActivityNeedle).exec(function (err, createdActivity) {

                    if (err) {

                        return res.serverError(err);

                    } else {

                        res.ok();

                    }

                });

            }

        });

    },

    unmarkWatch: function (req, res) {

        var findActivityNeedle = {
            activity: {code: 'wn'},
            movie: req.body.movie,
            user: req.body.user
        };

        Activity.findOne(findActivityNeedle).exec(function (err, foundActivity) {

            if (err) {

                return res.serverError(err);

            } else if (typeof foundActivity === 'undefined') {

                return res.stahp('You haven\'t marked this to watch.');

            } else {

                Activity.destroy(findActivityNeedle).exec(function (err) {

                    if (err) {

                        return res.serverError(err);

                    } else {

                        return res.ok();

                    }

                });

            }

        });

    },

    markWatched: function (req, res) {

        var code = 'wy';

        var findActivityNeedle = {
            activity: {code: code},
            movie: req.body.movie,
            user: req.body.user
        };

        Activity.findOne(findActivityNeedle).exec(function (err, foundActivity) {

            if (err) {

                return res.serverError(err);

            } else if (typeof foundActivity !== 'undefined') {

                return res.stahp('You have already marked this as watched.');

            } else {

                var createActivityNeedle = {
                    activity: {
                        code: code,
                        points: sails.config.ACTIVITIES[code].points,
                        reference: null,
                        string: sails.config.ACTIVITIES[code].string
                    },
                    movie: req.body.movie,
                    user: req.body.user
                };

                Activity.create(createActivityNeedle).exec(function (err, createdActivity) {

                    if (err) {

                        return res.serverError(err);

                    } else {

                        res.ok();

                    }

                });

            }

        });

    },

    unmarkWatched: function (req, res) {

        var findActivityNeedle = {
            activity: {
                code: 'wy'
            },
            movie: req.body.movie,
            user: req.body.user
        };

        Activity.findOne(findActivityNeedle).exec(function (err, foundActivity) {

            if (err) {

                return res.serverError(err);

            } else if (typeof foundActivity === 'undefined') {

                return res.stahp('You haven\'t marked this as watched.');

            } else {

                Activity.destroy(findActivityNeedle).exec(function (err) {

                    if (err) {

                        return res.serverError(err);

                    } else {

                        return res.ok();

                    }

                });

            }

        });

    }

};