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

        password: {
            type: 'string',
            protected: true,
            required: true
        },

        points: {
            type: 'integer',
            defaultsTo: 0,
            min: 0
        },

        type: {
            type: 'string',
            enum: ['user', 'staff'],
            defaultsTo: 'user'
        },

        // Optional

        avatar: {
            type: 'string',
            url: true
        },

        /* --- RELATIONS --- */

        activities: {
            collection: 'activity',
            via: 'user'
        },

        collections: {
            collection: 'collection',
            via: 'user'
        },

        reviews: {
            collection: 'review',
            via: 'user'
        }

    },

    beforeCreate: function (user, callback) {

        user.password = CryptoService.encrypt(user.password);

        return callback(null);

    }

};