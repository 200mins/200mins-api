/**
 * MovieController
 *
 * @description :: Server-side logic for managing movies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    getUserActivity: function (req, res) {

        // Set variables

        var movieID = req.movieID;

        var userID = req.userID;

        async.parallel({

            isLike: function (callback) {

                var findActivityNeedle = {
                    code: 'movie-like',
                    movie: movieID,
                    user: userID
                };

                Activity.findOne(findActivityNeedle).exec(function (err, foundActivity) {

                    if (err) {

                        callback(err);

                    } else if (!foundActivity) {

                        callback(null, false);

                    } else {

                        callback(null, true);

                    }

                });

            },

            isMarkWatchLater: function (callback) {

                var findActivityNeedle = {
                    code: 'movie-mark-watch-later',
                    movie: movieID,
                    user: userID
                };

                Activity.findOne(findActivityNeedle).exec(function (err, foundActivity) {

                    if (err) {

                        callback(err);

                    } else if (!foundActivity) {

                        callback(null, false);

                    } else {

                        callback(null, true);

                    }

                });

            },

            isMarkWatched: function (callback) {

                var findActivityNeedle = {
                    code: 'movie-mark-watched',
                    movie: movieID,
                    user: userID
                };

                Activity.findOne(findActivityNeedle).exec(function (err, foundActivity) {

                    if (err) {

                        callback(err);

                    } else if (!foundActivity) {

                        callback(null, false);

                    } else {

                        callback(null, true);

                    }

                });

            }

        }, function (err, result) {

            if (err) {

                return res.serverError(err);

            } else {

                return res.json(result);

            }

        });

    }

};