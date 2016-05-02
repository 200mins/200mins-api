module.exports = function (req, res, next) {

    // Set variables

    var imdbID = req.params.imdbID;

    // Find movie

    var findMovieNeedle = {imdbID: imdbID};

    Movie.findOne(findMovieNeedle).exec(function (err, foundMovie) {

        if (err) {

            return res.serverError(err);

        } else if (!foundMovie) {

            // Get movie

            var request = require('request');

            var config = {
                json: true,
                url: 'http://yify.is/api/v2/list_movies.json?query_term=' + imdbID
            };

            // TODO: Check error when body is not a valid JSON

            request(config, function (err, response, body) {

                var movie = body.data.movies[0];

                if (movie.imdb_code !== imdbID) {

                    return res.notFound('Movie not found.');

                } else {

                    // Save movie

                    var createMovieNeedle = {
                        imdbID: movie.imdb_code,
                        coverURL: movie.medium_cover_image,
                        genres: movie.genres,
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

            });

        } else {

            req.movieID = foundMovie.id;

            return next();

        }

    });

};