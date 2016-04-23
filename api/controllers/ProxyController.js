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

        request(url, function (err, response, body) {

            if (!err && response.statusCode === 200) {

                var data = JSON.parse(body);

                if (data.status === 'ok') {

                    res.json(data.data);

                } else {

                    return res.serverError(err);

                }

            } else {

                return res.serverError(err);

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

            request(url, function (err, response, body) {

                if (!err && response.statusCode === 200) {

                    var data = JSON.parse(body);

                    if (data.status === 'ok') {

                        res.json(data.data);

                    } else {

                        return res.serverError(err);

                    }

                } else {

                    return res.serverError(err);

                }

            });

        } else {

            res.badRequest();

        }

    },

    movie_suggestions: function (req, res) {

        if (req.query.hasOwnProperty('movie_id')) {

            var url = 'https://yts.ag/api/v2/movie_suggestions.json?movie_id=' + req.query.movie_id;

            request(url, function (err, response, body) {

                if (!err && response.statusCode === 200) {

                    var data = JSON.parse(body);

                    if (data.status === 'ok') {

                        res.json(data.data);

                    } else {

                        return res.serverError(err);

                    }

                } else {

                    return res.serverError(err);

                }

            });

        } else {

            res.badRequest();

        }

    }

};