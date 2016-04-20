/**
 * CollectionController
 *
 * @description :: Server-side logic for managing collections
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    create: function (req, res) {

        if (!req.body.hasOwnProperty('name')) {

            return res.badRequest();

        } else {

            var findCollectionNeedle = {
                movies: req.body.movies,
                name: req.body.name,
                user: req.body.user
            };

            Collection.create(findCollectionNeedle).exec(function (err, createdCollection) {

                if (err) {

                    return sails.config.environment === 'development' ? res.serverError(err) : res.serverError();

                } else {

                    return res.json(createdCollection);

                }

            });

        }

    },

    update: function (req, res) {

        if (!req.body.hasOwnProperty('id') || !req.body.hasOwnProperty('name')) {

            return res.badRequest();

        } else {

            var findCollectionNeedle = { id: req.body.id };

            Collection.findOne(findCollectionNeedle).exec(function (err, foundCollection) {

                if (err) {

                    return sails.config.environment === 'development' ? res.serverError(err) : res.serverError();

                } else if (typeof foundCollection === 'undefined') {

                    return res.badRequest('Original collection was not found.');

                } else {

                    var updatedCollection = {
                        movies: req.body.movies,
                        name: req.body.name
                    };

                    Collection.update(findCollectionNeedle, updatedCollection).exec(function (err, updatedCollections) {

                        if (err) {

                            return sails.config.environment === 'development' ? res.serverError(err) : res.serverError();

                        } else {

                            return res.json(updatedCollections[0]);

                        }

                    });

                }

            });

        }

    },

    delete: function (req, res) {

        if (!req.body.hasOwnProperty('id')) {

            return res.badRequest();

        } else {

            var findCollectionNeedle = {
                id: req.body.id,
                user: req.body.user
            };

            Collection.findOne(findCollectionNeedle).exec(function (err, foundCollection) {

                if (err) {

                    return sails.config.environment === 'development' ? res.serverError(err) : res.serverError();

                } else if (typeof foundCollection === 'undefined') {

                    res.forbidden('Original collection was not found.');

                } else {

                    Collection.destroy(findCollectionNeedle).exec(function (err) {

                        if (err) {

                            return sails.config.environment === 'development' ? res.serverError(err) : res.serverError();

                        } else {

                            return res.ok();

                        }

                    });

                }

            });

        }

    }

};