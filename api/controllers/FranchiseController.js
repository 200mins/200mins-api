/**
 * FranchiseController
 *
 * @description :: Server-side logic for managing franchises
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
                        name: req.body.name
                    };

                    Franchise.create(needle).exec(function (err, franchise) {

                        if (err) {

                            return sails.config.environment === 'development' ? res.serverError(err) : res.serverError();

                        } else {

                            return res.json(franchise);

                        }

                    });

                }

                break;

            case 'PUT':

                if (!req.body.hasOwnProperty('id')) {

                    return res.badRequest();

                } else {

                    var needle = { id: req.body.id };

                    Franchise.findOne(needle).exec(function (err, franchise) {

                        if (err) {

                            return sails.config.environment === 'development' ? res.serverError(err) : res.serverError();

                        } else if (typeof franchise === 'undefined') {

                            return res.badRequest('Original franchise was not found.');

                        } else {

                            Franchise.update(needle, req.body).exec(function (err, updatedFranchises) {

                                if (err) {

                                    return sails.config.environment === 'development' ? res.serverError(err) : res.serverError();

                                } else {

                                    return res.json(updatedFranchises[0]);

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

                    var needle = { id: req.body.id };

                    Franchise.findOne(needle).exec(function (err, franchise) {

                        if (err) {

                            return sails.config.environment === 'development' ? res.serverError(err) : res.serverError();

                        } else if (typeof franchise === 'undefined') {

                            res.forbidden('Original franchise was not found.');

                        } else {

                            Franchise.destroy(needle).exec(function (err) {

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