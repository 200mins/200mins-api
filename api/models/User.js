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
            type: 'email',
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

        var bcrypt = require('bcrypt');

        bcrypt.genSalt(10, function (err, salt) {

            if (err) {

                return callback(err);

            } else {

                bcrypt.hash(user.password, salt, function (err, hash) {

                    if (err) {

                        return callback(err);

                    }

                    user.password = hash;

                    return callback(null);

                });

            }

        });

    }

};