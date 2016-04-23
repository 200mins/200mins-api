/**
 * FranchiseController
 *
 * @description :: Server-side logic for managing franchises
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    create: function (req, res) {

        if (!req.body.hasOwnProperty('name')) {

            return res.badRequest();

        } else {

            var createFranchiseNeedle = {
                movies: req.body.movies,
                name: req.body.name
            };

            Franchise.create(createFranchiseNeedle).exec(function (err, createdFranchise) {

                if (err) {

                    return res.serverError(err);

                } else {

                    return res.json(createdFranchise);

                }

            });

        }

    },

    delete: function (req, res) {

        if (!req.body.hasOwnProperty('id')) {

            return res.badRequest();

        } else {

            var findFranchiseNeedle = {id: req.body.id};

            Franchise.findOne(findFranchiseNeedle).exec(function (err, foundFranchise) {

                if (err) {

                    return res.serverError(err);

                } else if (typeof foundFranchise === 'undefined') {

                    res.stahp('Original franchise was not found.');

                } else {

                    Franchise.destroy(findFranchiseNeedle).exec(function (err) {

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

            var findFranchiseNeedle = {id: req.body.id};

            Franchise.findOne(findFranchiseNeedle).exec(function (err, foundFranchise) {

                if (err) {

                    return res.serverError(err);

                } else if (typeof foundFranchise === 'undefined') {

                    return res.stahp('Original franchise was not found.');

                } else {

                    var updatedFranchise = {
                        movies: req.body.movies,
                        name: req.body.name
                    };

                    Franchise.update(findFranchiseNeedle, updatedFranchise).exec(function (err, updatedFranchises) {

                        if (err) {

                            return res.serverError(err);

                        } else {

                            return res.json(updatedFranchises[0]);

                        }

                    });

                }

            });

        }

    }

};