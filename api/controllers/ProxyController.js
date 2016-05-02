/**
 * ProxyController
 *
 * @description :: Server-side logic for managing proxies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var request = require('request');

module.exports = {
    
    getListMovies: function (req, res) {

        var config = {
            json: true,
            url: 'https://yts.ag/api/v2/list_movies.json' + UtilityService.objectToQueryString(req.query)
        };

        request(config, function (err, response, body) {

            if (err) {

                return res.serverError(err);

            } else {

                return res.json(body.data.movies);

            }

        });

    },
    getMovieDetails: function (req, res) {

        if (req.query.hasOwnProperty('movie_id') && !isNaN(req.query.movie_id)) {

            var params = {
                movie_id: req.query.movie_id,
                with_cast: true,
                with_images: true
            };

            var url = 'https://yts.ag/api/v2/movie_details.json' + UtilityService.objectToQueryString(params);

            request(url, function (err, response, body) {

                if (!err && response.statusCode === 200 && body.length !== 0) {

                    var data = JSON.parse(body);

                    if (data.status === 'ok') {

                        if (data.data.movie.id > 0) {

                            return res.json(data.data);

                        } else {

                            return res.notFound();

                        }

                    } else {

                        return res.serverError(err);

                    }

                } else {

                    return res.serverError(err);

                }

            });

        } else {

            return res.badRequest();

        }

    }

};