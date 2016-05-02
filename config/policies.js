module.exports.policies = {

    ActivityController: {
        '*': ['isAuthenticated', 'saveMovie']
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