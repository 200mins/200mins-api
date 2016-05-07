/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {

        /* --- ATTRIBUTES --- */

        // Unique

        email: {
            type: 'string',
            protected: true,
            required: true,
            unique: true
        },

        username: {
            type: 'string',
            required: true,
            unique: true
        },

        // Required

        city: {
            type: 'string',
            required: true
        },

        countryCode: {
            type: 'string',
            required: true
        },

        password: {
            type: 'string',
            protected: true,
            required: true
        },

        // Set automatically

        avatar: {
            type: 'string',
            url: true
        },

        karma: {
            type: 'integer'
        },

        type: {
            type: 'string',
            enum: ['staff', 'user']
        },

        /* --- RELATIONS --- */

        activities: {
            collection: 'activity',
            via: 'user'
        }

    },

    beforeCreate: function (user, callback) {

        user.karma = 0;

        user.password = CryptoService.encrypt(user.password);

        user.type = 'user';

        return callback(null);

    }

};