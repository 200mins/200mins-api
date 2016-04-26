module.exports = function (req, res, next) {

    if (!req.body.hasOwnProperty('movie')) {

        return res.badRequest();

    } else {

        var cleanedMovie = MovieService.clean(req.body.movie);

        if (typeof cleanedMovie === 'undefined') {

            return res.badRequest();

        } else {

            req.body.movie = cleanedMovie;

            return next();

        }

    }

};