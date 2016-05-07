module.exports.policies = {

    ActivityController: {
        '*': ['isJWTValid', 'saveMovie']
    },

    MovieController: {
        getUserActivity: ['isJWTValid', 'saveMovie']
    },

    ProxyController: {
        '*': true
    },

    UserController: {
        '*': 'isUsernameValid',
        create: true
    }

};