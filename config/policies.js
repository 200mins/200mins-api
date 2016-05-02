module.exports.policies = {

    ActivityController: {
        postDownload: ['isAuthenticated', 'saveMovie'],
        postPlay: ['isAuthenticated', 'saveMovie'],
        postMovieLike: ['isAuthenticated', 'saveMovie'],
        postMovieWatchLater: ['isAuthenticated', 'saveMovie'],
        postMovieWatched: ['isAuthenticated', 'saveMovie']
    },

    MovieController: {
        getStatus: ['isAuthenticated', 'saveMovie']
    },

    ProxyController: {
        getListMovies: true,
        getMovieDetails: true
    },

    UserController: {
        create: true,
        getMovieLike: true,
        getMovieWatchLater: true,
        getMovieWatched: true,
        getSession: true
    }

};