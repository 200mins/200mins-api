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

        return cleanedMovie;

    },

    cleanArray: function (movieArray) {

        var cleanedArray = [];

        movieArray.forEach(function (movie) {

            var cleanMovie = MovieService.clean(movie);

            if (!cleanMovie) {

                return false;

            } else {

                cleanedArray.push(cleanMovie);

            }

        });

        return cleanedArray;

    }

};