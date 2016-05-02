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
        '*': true
    }

};