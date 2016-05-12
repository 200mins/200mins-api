module.exports.policies = {

    ActivityController: {
        '*': ['isJWTValid', 'saveMovie']
    },

    MovieController: {
        '*': ['isJWTValid', 'saveMovie']
    },

    ProxyController: {
        '*': true
    },

    UserController: {
        '*': 'isUsernameValid',
        create: true,
        getUserNew: true
    }

};