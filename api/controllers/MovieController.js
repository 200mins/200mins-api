/**
 * MovieController
 *
 * @description :: Server-side logic for managing movies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    status: function (req, res) {

        if (!req.query.hasOwnProperty('movieID')) {

            return res.badRequest();

        } else {

            var REQUEST = request.query;
            
            var USERID = req.userID;

            async.parallel({

                isLike: function (callback) {

                    var findActivityNeedle = {
                        code: 'l',
                        movie: REQUEST.movieID,
                        user: USERID
                    };

                    Activity.findOne(findActivityNeedle).exec(function (err, foundActivity) {

                        if (err) {

                            callback(err);

                        } else if (typeof foundActivity === 'undefined') {

                            callback(null, false);

                        } else {

                            callback(null, true);

                        }

                    });

                },

                isWatch: function (callback) {

                    var findActivityNeedle = {
                        code: 'wn',
                        movie: REQUEST.movieID,
                        user: USERID
                    };

                    Activity.findOne(findActivityNeedle).exec(function (err, foundActivity) {

                        if (err) {

                            callback(err);

                        } else if (typeof foundActivity === 'undefined') {

                            callback(null, false);

                        } else {

                            callback(null, true);

                        }

                    });

                },

                isWatched: function (callback) {

                    var findActivityNeedle = {
                        code: 'wy',
                        movie: REQUEST.movieID,
                        user: USERID
                    };

                    Activity.findOne(findActivityNeedle).exec(function (err, foundActivity) {

                        if (err) {

                            callback(err);

                        } else if (typeof foundActivity === 'undefined') {

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

    }

};