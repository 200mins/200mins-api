/**
 * ActivityController
 *
 * @description :: Server-side logic for managing activities
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var KARMAS = {
    'download': -10,
    'movie-like': 0,
    'movie-watch-later': 0,
    'movie-watched': 5,
    'play': -5
};

module.exports = {

    postDownload: function (req, res) {

        // Set variables

        var code = 'download';

        var movieID = req.movieID;

        var userID = req.userID;

        // Check request

        if (!req.query.hasOwnProperty('quality')) {

            return res.badRequest('quality');

        } else {

            var quality = req.query.quality.toUpperCase();

            if (!(quality === '3D' || quality === '720P' || quality === '1080P')) {

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

                                return res.json(createdActivity);

                            }

                        });

                    } else {

                        var response = foundActivity;

                        response.karmaDelta = 0;

                        return res.json(response);

                    }

                });

            }

        }

    },

    postMovieLike: function (req, res) {

        // Set variables

        var code = 'movie-like';

        var isLike = req.query.islike;

        var movieID = req.movieID;

        var userID = req.userID;

        // Check request

        if (!(isLike === true || isLike === false)) {

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

                    if (!isLike) {

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

                                return res.json({karmaDeta: KARMAS[code]});

                            }

                        });

                    }

                } else {

                    if (!isLike) {

                        // Delete activity

                        Activity.destroy(foundActivity).exec(function (err) {

                            if (err) {

                                return res.serverError(err);

                            } else {

                                return res.json({karmaDelta: KARMAS[code] * -1});

                            }

                        });

                    } else {

                        return res.stahp('You have already liked this movie.');

                    }

                }

            });

        }

    },

    postMovieWatchLater: function (req, res) {

        // Set variables

        var code = 'movie-watch-later';

        var isLike = req.query.islike;

        var movieID = req.movieID;

        var userID = req.userID;

        // Check request

        if (!(isLike === true || isLike === false)) {

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

                    if (!isLike) {

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

                                return res.json({karmaDeta: KARMAS[code]});

                            }

                        });

                    }

                } else {

                    if (!isLike) {

                        // Delete activity

                        Activity.destroy(foundActivity).exec(function (err) {

                            if (err) {

                                return res.serverError(err);

                            } else {

                                return res.json({karmaDelta: KARMAS[code] * -1});

                            }

                        });

                    } else {

                        return res.stahp('You have already marked this movie to watch later.');

                    }

                }

            });

        }

    },

    postMovieWatched: function (req, res) {

        // Set variables

        var code = 'movie-watched';

        var isLike = req.query.islike;

        var movieID = req.movieID;

        var userID = req.userID;

        // Check request

        if (!(isLike === true || isLike === false)) {

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

                    if (!isLike) {

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

                                return res.json({karmaDeta: KARMAS[code]});

                            }

                        });

                    }

                } else {

                    if (!isLike) {

                        // Delete activity

                        Activity.destroy(foundActivity).exec(function (err) {

                            if (err) {

                                return res.serverError(err);

                            } else {

                                return res.json({karmaDelta: KARMAS[code] * -1});

                            }

                        });

                    } else {

                        return res.stahp('You have already marked this movie as watched.');

                    }

                }

            });

        }

    },

    postPlay: function (req, res) {

        // Set variables

        var code = 'play';

        var movieID = req.movieID;

        var userID = req.userID;

        // Check request

        if (!req.query.hasOwnProperty('quality')) {

            return res.badRequest('quality');

        } else {

            var quality = req.query.quality.toUpperCase();

            if (!(quality === '3D' || quality === '720P' || quality === '1080P')) {

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

                                return res.json(createdActivity);

                            }

                        });

                    } else {

                        var response = foundActivity;

                        response.karmaDelta = 0;

                        return res.json(response);

                    }

                });

            }

        }

    }

};