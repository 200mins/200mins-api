module.exports.policies = {

    ActivityController: {
        '*': ['isJWTValid', 'saveMovie']
    },

    MovieController: {
        getStatus: ['isJWTValid', 'saveMovie']
    },

    ProxyController: {
        '*': true
    },

    UserController: {
        '*': 'isUsernameValid',
        create: true
    }

};