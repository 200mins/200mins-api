/**
 * ProxyController
 *
 * @description :: Server-side logic for managing proxies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var request = require('request');

module.exports = {

    list_movies: function (req, res) {

        var url = 'https://yts.ag/api/v2/list_movies.json' + UtilityService.objectToQueryString(req.query);

        request(url, function (error, response, body) {

            if (!error && response.statusCode === 200) {

                var response = JSON.parse(body);

                if (response.status === 'ok') {

                    res.json(response.data);

                } else {

                    res.serverError();

                }

            } else {

                res.serverError();

            }

        });

    },

    movie_details: function (req, res) {

        if (req.query.hasOwnProperty('movie_id')) {

            var params = {
                movie_id: req.query.movie_id,
                with_cast: true,
                with_images: true
            };

            var url = 'https://yts.ag/api/v2/movie_details.json' + UtilityService.objectToQueryString(params);

            request(url, function (error, response, body) {

                if (!error && response.statusCode === 200) {

                    var response = JSON.parse(body);

                    if (response.status === 'ok') {

                        res.json(response.data);

                    } else {

                        res.serverError();

                    }

                } else {

                    res.serverError();

                }

            });

        } else {

            res.badRequest();

        }

    },

    movie_suggestions: function (req, res) {

        if (req.query.hasOwnProperty('movie_id')) {

            var url = 'https://yts.ag/api/v2/movie_suggestions.json?movie_id=' + req.query.movie_id;

            request(url, function (error, response, body) {

                if (!error && response.statusCode === 200) {

                    var response = JSON.parse(body);

                    if (response.status === 'ok') {

                        res.json(response.data);

                    } else {

                        res.serverError();

                    }

                } else {

                    res.serverError();

                }

            });

        } else {

            res.badRequest();

        }

    }

};