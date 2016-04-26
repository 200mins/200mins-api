var cleanedMovieKeys = {
    genres: true,
    id: true,
    imdb_code: true,
    medium_cover_image: true,
    rating: true,
    runtime: true,
    title: true,
    year: true
};

module.exports = {

    clean: function (movie) {

        var cleanedMovie = {};

        for (var key in cleanedMovieKeys) {

            if (!movie.hasOwnProperty(key)) {

                return;

            } else {

                cleanedMovie[key] = movie[key];

            }

        }

        var movieSchema = {
            imdbID: cleanedMovie.imdb_code,
            coverURL: cleanedMovie.medium_cover_image,
            genres: cleanedMovie.genres,
            imdbRating: cleanedMovie.rating,
            runtime: cleanedMovie.runtime,
            title: cleanedMovie.title,
            year: cleanedMovie.year,
            yifyID: cleanedMovie.id
        };

        return movieSchema;

    }

};