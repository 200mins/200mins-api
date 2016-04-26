var cleanedMovieKeys = {
    id: true,
    imdb_code: true,
    title: true,
    year: true,
    rating: true,
    runtime: true,
    genres: true,
    medium_cover_image: true
};

module.exports = {

    clean: function (movie) {

        var cleanedMovie = {};

        for (var key in cleanedMovieKeys) {

            if (movie.hasOwnProperty(key)) {

                cleanedMovie[key] = movie[key];

            } else {

                return false;

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