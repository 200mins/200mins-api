var request = require('request');

module.exports = function (req, res, next) {

    // Set variables

    var imdbID = req.params.imdbID;

    // Find movie

    var findMovieNeedle = {imdbID: imdbID};

    Movie.findOne(findMovieNeedle).exec(function (err, foundMovie) {

        if (err) {

            return res.serverError(err);

        } else if (!foundMovie) {

            // Request movie

            var config = {
                json: true,
                url: 'https://yts.ag/api/v2/list_movies.json?query_term=' + imdbID
            };

            request(config, function (err, response, body) {

                if (err || response.statusCode !== 200) {

                    return res.serverError({error: err, statusCode: response.statusCode});

                } else if (body.data.movie_count !== 1) {

                    return res.serverError('Movie not found.');

                } else {

                    var movie = body.data.movies[0];

                    if (movie.imdb_code !== imdbID) {

                        return res.notFound('Movie not found.');

                    } else {

                        // Create movie

                        var createMovieNeedle = {
                            coverURL: movie.medium_cover_image,
                            genres: movie.genres,
                            imdbID: movie.imdb_code,
                            imdbRating: movie.rating,
                            mpaRating: movie.mpa_rating.toUpperCase(),
                            runtime: movie.runtime,
                            title: movie.title,
                            year: movie.year
                        };

                        Movie.create(createMovieNeedle).exec(function (err, createdMovie) {

                            if (err) {

                                return res.serverError(err);

                            } else {

                                req.movieID = createdMovie.id;

                                return next();

                            }

                        });

                    }

                }

            });

        } else {

            req.movieID = foundMovie.id;

            return next();

        }

    });

};