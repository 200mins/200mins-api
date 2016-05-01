module.exports = function (req, res, next) {

    if (!req.query.hasOwnProperty('imdbID') || !req.query.hasOwnProperty('title')) {

        return res.badRequest('imdbID || title');

    } else {

        var imdbID = req.query.imdbID;

        var title = req.query.title;

        var findMovieNeedle = {imdbID: imdbID};

        Movie.findOne(findMovieNeedle).exec(function (err, foundMovie) {

            if (err) {

                return res.serverError(err);

            } else if (!foundMovie) {

                var request = require('request');

                var config = {
                    json: true,
                    url: 'http://yify.is/api/v2/list_movies.json?query_term=' + title
                };

                request(config, function (error, response, body) {

                    var movies;

                    try {

                        movies = JSON.parse(body).data.movies;

                    } catch (err) {

                        var errorResponse = {
                            err: err,
                            responseBody: body,
                            responseError: error,
                            responseStatusCode: response.statusCode
                        };

                        return res.serverError(errorResponse);

                    }

                    var createMovieNeedle;

                    async.each(movies, function (movie, callback) {

                        if (movie.imdb_code !== imdbID) {

                            callback(null);

                        } else {

                            createMovieNeedle = {
                                imdbID: movie.imdb_code,
                                coverURL: movie.medium_cover_image,
                                genres: movie.genres,
                                imdbRating: movie.rating,
                                title: movie.title,
                                year: movie.year
                            };

                            callback(null);

                        }

                    }, function () {

                        if (!createMovieNeedle) {

                            return res.notFound('Movie not found online.');

                        } else {

                            Movie.create(createMovieNeedle).exec(function (err, createdMovie) {

                                if (err) {

                                    return res.serverError(err);

                                } else {

                                    req.movieID = createdMovie.id;

                                    return next();

                                }

                            });

                        }

                    });

                });

            } else {

                req.movieID = foundMovie.id;

                return next();

            }

        });

    }

};