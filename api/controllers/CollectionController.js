/**
 * CollectionController
 *
 * @description :: Server-side logic for managing collections
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    index: function (req, res) {

        switch (req.method) {

            case 'POST':

                if (!req.body.hasOwnProperty('movies') || !req.body.hasOwnProperty('name')) {

                    return res.badRequest();

                } else {

                    var needle = {
                        movies: req.body.movies,
                        name: req.body.name,
                        user: req.body.user
                    };

                    Collection.create(needle).exec(function (err, collection) {

                        if (err) {

                            return sails.config.environment === 'development' ? res.serverError(err) : res.serverError();

                        } else {

                            return res.json(collection);

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

                    Collection.findOne(needle).exec(function (err, collection) {

                        if (err) {

                            return sails.config.environment === 'development' ? res.serverError(err) : res.serverError();

                        } else if (typeof collection === 'undefined') {

                            return res.badRequest('Original collection was not found.');

                        } else {

                            Collection.update(needle, req.body).exec(function (err, updatedCollections) {

                                if (err) {

                                    return sails.config.environment === 'development' ? res.serverError(err) : res.serverError();

                                } else {

                                    return res.json(updatedCollections[0]);

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

                    Collection.findOne(needle).exec(function (err, collection) {

                        if (err) {

                            return sails.config.environment === 'development' ? res.serverError(err) : res.serverError();

                        } else if (typeof collection === 'undefined') {

                            res.forbidden('Original collection was not found.');

                        } else {

                            Collection.destroy(needle).exec(function (err) {

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