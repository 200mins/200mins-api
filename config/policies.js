module.exports.policies = {

    ActivityController: {
        '*': ['isJWTValid', 'saveMovie']
    },

    MovieController: {
        getStatus: ['isJWTValid', 'saveMovie']
    },

    ProxyController: {
        getListMovies: true,
        getMovieDetails: true
    },

    UserController: {
        '*': 'isUserValid',
        create: true
    }

};