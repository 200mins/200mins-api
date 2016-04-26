/**
 * ActivityController
 *
 * @description :: Server-side logic for managing activities
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    download: function (req, res) {

        var REQUEST = req.body;

        var USERID = req.userID;

        if (!REQUEST.hasOwnProperty('quality')) {

            return res.badRequest();

        } else {

            var quality = REQUEST.quality.toUpperCase();

            if (!(quality === '3D' || quality === '720P' || quality === '1080P')) {

                return res.badRequest();

            } else {

                var code = 'd';

                var description = quality;

                var findMovieNeedle = {imdbID: REQUEST.movie.imdbID};

                Movie.findOrCreate(findMovieNeedle, REQUEST.movie).exec(function (err, foundOrCreatedMovie) {

                    if (err) {

                        return res.serverError(err);

                    } else {

                        var findActivityNeedle = {
                            code: code,
                            description: description,
                            movie: foundOrCreatedMovie.id,
                            user: USERID
                        };

                        Activity.findOne(findActivityNeedle).exec(function (err, foundActivity) {

                            if (err) {

                                return res.serverError(err);

                            } else if (typeof foundActivity !== 'undefined') {

                                var response = foundActivity;

                                response.karmaDelta = 0;

                                return res.json(response);

                            } else {

                                var createActivityNeedle = {
                                    code: code,
                                    description: description,
                                    karmaDelta: sails.config.KARMAS[code],
                                    movie: foundOrCreatedMovie.id,
                                    user: USERID
                                };

                                Activity.create(createActivityNeedle).exec(function (err, createdActivity) {

                                    if (err) {

                                        return res.serverError(err);

                                    } else {

                                        return res.json(createdActivity);

                                    }

                                });

                            }

                        });

                    }

                });

            }

        }

    },

    stream: function (req, res) {

        var REQUEST = req.body;

        var USERID = req.userID;

        if (!REQUEST.hasOwnProperty('quality')) {

            return res.badRequest();

        } else {

            var quality = REQUEST.quality.toUpperCase();

            if (!(quality === '3D' || quality === '720P' || quality === '1080P')) {

                return res.badRequest();

            } else {

                var code = 's';

                var description = quality;

                var findMovieNeedle = {imdbID: REQUEST.movie.imdbID};

                Movie.findOrCreate(findMovieNeedle, REQUEST.movie).exec(function (err, foundOrCreatedMovie) {

                    if (err) {

                        return res.serverError(err);

                    } else {

                        var findActivityNeedle = {
                            code: code,
                            description: description,
                            movie: foundOrCreatedMovie.id,
                            user: USERID
                        };

                        Activity.findOne(findActivityNeedle).exec(function (err, foundActivity) {

                            if (err) {

                                return res.serverError(err);

                            } else if (typeof foundActivity !== 'undefined') {

                                var response = foundActivity;

                                response.karmaDelta = 0;

                                return res.json(response);

                            } else {

                                var createActivityNeedle = {
                                    code: code,
                                    description: description,
                                    karmaDelta: sails.config.KARMAS[code],
                                    movie: foundOrCreatedMovie.id,
                                    user: USERID
                                };

                                Activity.create(createActivityNeedle).exec(function (err, createdActivity) {

                                    if (err) {

                                        return res.serverError(err);

                                    } else {

                                        return res.json(createdActivity);

                                    }

                                });

                            }

                        });

                    }

                });

            }

        }

    },

    like: function (req, res) {

        var REQUEST = req.body;

        var USERID = req.userID;

        var code = 'l';

        var findMovieNeedle = {imdbID: REQUEST.movie.imdbID};

        Movie.findOrCreate(findMovieNeedle, REQUEST.movie).exec(function (err, foundOrCreatedMovie) {

            if (err) {

                return res.serverError(err);

            } else {

                var findActivityNeedle = {
                    code: code,
                    movie: foundOrCreatedMovie.id,
                    user: USERID
                };

                Activity.findOne(findActivityNeedle).exec(function (err, foundActivity) {

                    if (err) {

                        return res.serverError(err);

                    } else if (typeof foundActivity !== 'undefined') {

                        return res.stahp('You have already liked this movie.');

                    } else {

                        var createActivityNeedle = {
                            code: code,
                            karmaDelta: sails.config.KARMAS[code],
                            movie: foundOrCreatedMovie.id,
                            user: USERID
                        };

                        Activity.create(createActivityNeedle).exec(function (err, createdActivity) {

                            if (err) {

                                return res.serverError(err);

                            } else {

                                return res.json(createdActivity);

                            }

                        });

                    }

                });

            }

        });

    },

    unlike: function (req, res) {

        var REQUEST = req.body;

        var USERID = req.userID;

        var code = 'l';

        var findMovieNeedle = {imdbID: REQUEST.movie.imdbID};

        Movie.findOrCreate(findMovieNeedle, REQUEST.movie).exec(function (err, foundOrCreatedMovie) {

            if (err) {

                return res.serverError(err);

            } else {

                var findActivityNeedle = {
                    code: code,
                    movie: foundOrCreatedMovie.id,
                    user: USERID
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

                                return res.json({karmaDelta: sails.config.KARMAS[code] * -1});

                            }

                        });

                    }

                });

            }

        });

    },

    markWatch: function (req, res) {

        var REQUEST = req.body;

        var USERID = req.userID;

        var code = 'wn';

        var findMovieNeedle = {imdbID: REQUEST.movie.imdbID};

        Movie.findOrCreate(findMovieNeedle, REQUEST.movie).exec(function (err, foundOrCreatedMovie) {

            if (err) {

                return res.serverError(err);

            } else {

                var findActivityNeedle = {
                    code: code,
                    movie: foundOrCreatedMovie.id,
                    user: USERID
                };

                Activity.findOne(findActivityNeedle).exec(function (err, foundActivity) {

                    if (err) {

                        return res.serverError(err);

                    } else if (typeof foundActivity !== 'undefined') {

                        return res.stahp('You\'ve already marked this to watch.');

                    } else {

                        var createActivityNeedle = {
                            code: code,
                            karmaDelta: sails.config.KARMAS[code],
                            movie: foundOrCreatedMovie.id,
                            user: USERID
                        };

                        Activity.create(createActivityNeedle).exec(function (err, createdActivity) {

                            if (err) {

                                return res.serverError(err);

                            } else {

                                return res.json(createdActivity);

                            }

                        });

                    }

                });

            }

        });

    },

    unmarkWatch: function (req, res) {

        var REQUEST = req.body;

        var USERID = req.userID;

        var code = 'wn';

        var findMovieNeedle = {imdbID: REQUEST.movie.imdbID};

        Movie.findOrCreate(findMovieNeedle, REQUEST.movie).exec(function (err, foundOrCreatedMovie) {

            if (err) {

                return res.serverError(err);

            } else {

                var findActivityNeedle = {
                    code: code,
                    movie: foundOrCreatedMovie.id,
                    user: USERID
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

                                return res.json({karmaDelta: sails.config.KARMAS[code] * -1});

                            }

                        });

                    }

                });

            }

        });

    },

    markWatched: function (req, res) {

        var REQUEST = req.body;

        var USERID = req.userID;

        var code = 'wy';

        var findMovieNeedle = {imdbID: REQUEST.movie.imdbID};

        Movie.findOrCreate(findMovieNeedle, REQUEST.movie).exec(function (err, foundOrCreatedMovie) {

            if (err) {

                return res.serverError(err);

            } else {

                var findActivityNeedle = {
                    code: code,
                    movie: foundOrCreatedMovie.id,
                    user: USERID
                };

                Activity.findOne(findActivityNeedle).exec(function (err, foundActivity) {

                    if (err) {

                        return res.serverError(err);

                    } else if (typeof foundActivity !== 'undefined') {

                        return res.stahp('You\'ve already marked this as watched.');

                    } else {

                        var createActivityNeedle = {
                            code: code,
                            karmaDelta: sails.config.KARMAS[code],
                            movie: foundOrCreatedMovie.id,
                            user: USERID
                        };

                        Activity.create(createActivityNeedle).exec(function (err, createdActivity) {

                            if (err) {

                                return res.serverError(err);

                            } else {

                                return res.json(createdActivity);

                            }

                        });

                    }

                });

            }

        });

    },

    unmarkWatched: function (req, res) {

        var REQUEST = req.body;

        var USERID = req.userID;

        var code = 'wy';

        var findMovieNeedle = {imdbID: REQUEST.movie.imdbID};

        Movie.findOrCreate(findMovieNeedle, REQUEST.movie).exec(function (err, foundOrCreatedMovie) {

            if (err) {

                return res.serverError(err);

            } else {

                var findActivityNeedle = {
                    code: code,
                    movie: foundOrCreatedMovie.id,
                    user: USERID
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

                                return res.json({karmaDelta: sails.config.KARMAS[code] * -1});

                            }

                        });

                    }

                });

            }

        });

    }

};