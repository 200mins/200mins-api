/**
 * ActivityController
 *
 * @description :: Server-side logic for managing activities
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var KARMAS = {
    'movie-download': -10,
    'movie-like': 0,
    'movie-mark-watch-later': 0,
    'movie-mark-watched': 5,
    'movie-play': -5
};

module.exports = {

    postMovieDownload: function (req, res) {

        // Set variables

        var code = 'movie-download';

        var movieID = req.movieID;

        var quality;

        var userID = req.userID;

        // Validate request

        if (!req.query.hasOwnProperty('quality')) {

            return res.badRequest('quality');

        } else {

            var quality = req.query.quality.toUpperCase();

            if (!(quality === '720P' || quality === '1080P' || quality === '3D')) {

                return res.badRequest('quality');

            } else {

                // Find activity

                var findActivityNeedle = {
                    code: code,
                    description: quality,
                    movie: movieID,
                    user: userID
                };

                Activity.findOne(findActivityNeedle).exec(function (err, foundActivity) {

                    if (err) {

                        return res.serverError(err);

                    } else if (!foundActivity) {

                        // Create activity

                        var createActivityNeedle = {
                            code: code,
                            description: quality,
                            karmaDelta: KARMAS[code],
                            movie: movieID,
                            user: userID
                        };

                        Activity.create(createActivityNeedle).exec(function (err, createdActivity) {

                            if (err) {

                                return res.serverError(err);

                            } else {

                                return res.json({karmaDelta: createdActivity.karmaDelta});

                            }

                        });

                    } else {

                        return res.json({karmaDelta: 0});

                    }

                });

            }

        }

    },

    postMovieLike: function (req, res) {

        // Set variables

        var code = 'movie-like';

        var movieID = req.movieID;

        var userID = req.userID;

        var value = req.query.value;

        // Validate request

        if (!(value === 'true' || value === 'false')) {

            return res.badRequest('value');

        } else {

            // Find activity

            var findActivityNeedle = {
                code: code,
                movie: movieID,
                user: userID
            };

            Activity.findOne(findActivityNeedle).exec(function (err, foundActivity) {

                if (err) {

                    return res.serverError(err);

                } else if (!foundActivity) {

                    if (value !== 'true') {

                        return res.stahp('You haven\'t liked this movie.');

                    } else {

                        // Create activity

                        var createActivityNeedle = {
                            code: code,
                            karmaDelta: KARMAS[code],
                            movie: movieID,
                            user: userID
                        };

                        Activity.create(createActivityNeedle).exec(function (err, createdActivity) {

                            if (err) {

                                return res.serverError(err);

                            } else {

                                return res.json({karmaDelta: createdActivity.karmaDelta});

                            }

                        });

                    }

                } else {

                    if (value !== 'true') {

                        // Delete activity

                        Activity.destroy(foundActivity).exec(function (err) {

                            if (err) {

                                return res.serverError(err);

                            } else {

                                return res.json({karmaDelta: foundActivity.karmaDelta * -1});

                            }

                        });

                    } else {

                        return res.stahp('You\'ve already liked this movie.');

                    }

                }

            });

        }

    },

    postMovieMarkWatchLater: function (req, res) {

        // Set variables

        var code = 'movie-mark-watch-later';

        var movieID = req.movieID;

        var userID = req.userID;

        var value = req.query.value;

        // Validate request

        if (!(value === 'true' || value === 'false')) {

            return res.badRequest('value');

        } else {

            // Find activity

            var findActivityNeedle = {
                code: code,
                movie: movieID,
                user: userID
            };

            Activity.findOne(findActivityNeedle).exec(function (err, foundActivity) {

                if (err) {

                    return res.serverError(err);

                } else if (!foundActivity) {

                    if (value !== 'true') {

                        return res.stahp('You haven\'t marked this movie to watch later.');

                    } else {

                        // Create activity

                        var createActivityNeedle = {
                            code: code,
                            karmaDelta: KARMAS[code],
                            movie: movieID,
                            user: userID
                        };

                        Activity.create(createActivityNeedle).exec(function (err, createdActivity) {

                            if (err) {

                                return res.serverError(err);

                            } else {

                                return res.json({karmaDelta: createdActivity.karmaDelta});

                            }

                        });

                    }

                } else {

                    if (value !== 'true') {

                        // Delete activity

                        Activity.destroy(foundActivity).exec(function (err) {

                            if (err) {

                                return res.serverError(err);

                            } else {

                                return res.json({karmaDelta: foundActivity.karmaDelta * -1});

                            }

                        });

                    } else {

                        return res.stahp('You\'ve already marked this movie to watch later.');

                    }

                }

            });

        }

    },

    postMovieMarkWatched: function (req, res) {

        // Set variables

        var code = 'movie-mark-watched';

        var movieID = req.movieID;

        var userID = req.userID;

        var value = req.query.value;

        // Validate request

        if (!(value === 'true' || value === 'false')) {

            return res.badRequest('value');

        } else {

            // Find activity

            var findActivityNeedle = {
                code: code,
                movie: movieID,
                user: userID
            };

            Activity.findOne(findActivityNeedle).exec(function (err, foundActivity) {

                if (err) {

                    return res.serverError(err);

                } else if (!foundActivity) {

                    if (value !== 'true') {

                        return res.stahp('You haven\'t marked this movie as watched.');

                    } else {

                        // Create activity

                        var createActivityNeedle = {
                            code: code,
                            karmaDelta: KARMAS[code],
                            movie: movieID,
                            user: userID
                        };

                        Activity.create(createActivityNeedle).exec(function (err, createdActivity) {

                            if (err) {

                                return res.serverError(err);

                            } else {

                                return res.json({karmaDelta: createdActivity.karmaDelta});

                            }

                        });

                    }

                } else {

                    if (value !== 'true') {

                        // Delete activity

                        Activity.destroy(foundActivity).exec(function (err) {

                            if (err) {

                                return res.serverError(err);

                            } else {

                                return res.json({karmaDelta: foundActivity.karmaDelta * -1});

                            }

                        });

                    } else {

                        return res.stahp('You\'ve already marked this movie as watched.');

                    }

                }

            });

        }

    },

    postMoviePlay: function (req, res) {

        // Set variables

        var code = 'movie-play';

        var movieID = req.movieID;

        var quality;

        var userID = req.userID;

        // Validate request

        if (!req.query.hasOwnProperty('quality')) {

            return res.badRequest('quality');

        } else {

            var quality = req.query.quality.toUpperCase();

            if (!(quality === '720P' || quality === '1080P' || quality === '3D')) {

                return res.badRequest('quality');

            } else {

                // Find activity

                var findActivityNeedle = {
                    code: code,
                    description: quality,
                    movie: movieID,
                    user: userID
                };

                Activity.findOne(findActivityNeedle).exec(function (err, foundActivity) {

                    if (err) {

                        return res.serverError(err);

                    } else if (!foundActivity) {

                        // Create activity

                        var createActivityNeedle = {
                            code: code,
                            description: quality,
                            karmaDelta: KARMAS[code],
                            movie: movieID,
                            user: userID
                        };

                        Activity.create(createActivityNeedle).exec(function (err, createdActivity) {

                            if (err) {

                                return res.serverError(err);

                            } else {

                                return res.json({karmaDelta: createdActivity.karmaDelta});

                            }

                        });

                    } else {

                        return res.json({karmaDelta: 0});

                    }

                });

            }

        }

    }

};