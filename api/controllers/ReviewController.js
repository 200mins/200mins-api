/**
 * ReviewController
 *
 * @description :: Server-side logic for managing reviews
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    index: function (req, res) {

        switch (req.method) {

            case 'POST':

                if (!req.body.hasOwnProperty('movie') || !req.body.hasOwnProperty('rating') || !req.body.hasOwnProperty('reaction') || req.body.hasOwnProperty('id')) {

                    return res.badRequest();

                } else {

                    var needle = {
                        movie: req.body.movie,
                        user: req.body.user
                    };

                    Review.findOne(needle).exec(function (err, review) {

                        if (err) {

                            return sails.config.environment === 'development' ? res.serverError(err) : res.serverError();

                        } else if (typeof review !== 'undefined') {

                            return res.forbidden('You have already reviewed this movie. Please edit the original review.');

                        } else {

                            var needle = {
                                movie: req.body.movie,
                                rating: req.body.rating,
                                reaction: req.body.reaction,
                                user: req.body.user
                            };

                            needle.comment = req.body.hasOwnProperty('comment') ? req.body.comment : null;

                            Review.create(needle).exec(function (err, review) {

                                if (err) {

                                    return sails.config.environment === 'development' ? res.serverError(err) : res.serverError();

                                } else {

                                    return res.json(review);

                                }

                            });

                        }

                    });

                }

                break;

            case 'PUT':

                if (!req.body.hasOwnProperty('id')) {

                    return res.badRequest();

                } else {

                    var needle = {
                        id: req.body.id,
                        user: req.body.user
                    };

                    Review.findOne(needle).exec(function (err, review) {

                        if (err) {

                            return sails.config.environment === 'development' ? res.serverError(err) : res.serverError();

                        } else if (typeof review === 'undefined') {

                            return res.badRequest('Original review was not found.');

                        } else {

                            Review.update(needle, req.body).exec(function (err, updatedReviews) {

                                if (err) {

                                    return sails.config.environment === 'development' ? res.serverError(err) : res.serverError();

                                } else {

                                    return res.json(updatedReviews[0]);

                                }

                            });

                        }

                    });

                }

                break;

            case 'DELETE':

                if (!req.body.hasOwnProperty('id')) {

                    return res.badRequest();

                } else {

                    var needle = {
                        id: req.body.id,
                        user: req.body.user
                    };

                    Review.findOne(needle).exec(function (err, review) {

                        if (err) {

                            return sails.config.environment === 'development' ? res.serverError(err) : res.serverError();

                        } else if (typeof review === 'undefined') {

                            res.forbidden('Original review was not found.');

                        } else {

                            Review.destroy(needle).exec(function (err) {

                                if (err) {

                                    return sails.config.environment === 'development' ? res.serverError(err) : res.serverError();

                                } else {

                                    return res.ok();

                                }

                            });

                        }

                    });

                }

                break;

            default:

                return res.notFound();

        }

    }

};