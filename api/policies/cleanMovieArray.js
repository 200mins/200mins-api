module.exports = function (req, res, next) {

    if(!req.body.hasOwnProperty('movies')){

        return res.badRequest();

    } else {

        var cleanedMovieArray = MovieService.cleanArray(req.body.movies);

        if(!cleanedMovieArray){

            return res.badRequest();

        } else {

            req.body.movies = cleanedMovieArray;

            return next();

        }

    }

}