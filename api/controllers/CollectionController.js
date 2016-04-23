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

            var createCollectionNeedle = {
                movies: req.body.movies,
                name: req.body.name,
                user: req.body.user
            };

            Collection.create(createCollectionNeedle).exec(function (err, createdCollection) {

                if (err) {

                    return res.serverError(err);

                } else {

                    return res.json(createdCollection);

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

                    return res.serverError(err);

                } else if (typeof foundCollection === 'undefined') {

                    res.stahp('Original collection was not found.');

                } else {

                    Collection.destroy(findCollectionNeedle).exec(function (err) {

                        if (err) {

                            return res.serverError(err);

                        } else {

                            return res.ok();

                        }

                    });

                }

            });

        }

    },

    update: function (req, res) {

        if (!req.body.hasOwnProperty('id') || !req.body.hasOwnProperty('name')) {

            return res.badRequest();

        } else {

            var findCollectionNeedle = {id: req.body.id};

            Collection.findOne(findCollectionNeedle).exec(function (err, foundCollection) {

                if (err) {

                    return res.serverError(err);

                } else if (typeof foundCollection === 'undefined') {

                    return res.stahp('Original collection was not found.');

                } else {

                    var updatedCollection = {
                        movies: req.body.movies,
                        name: req.body.name
                    };

                    Collection.update(findCollectionNeedle, updatedCollection).exec(function (err, updatedCollections) {

                        if (err) {

                            return res.serverError(err);

                        } else {

                            return res.json(updatedCollections[0]);

                        }

                    });

                }

            });

        }

    }

};