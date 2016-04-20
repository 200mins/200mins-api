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
            type: 'number',
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

        email: {
            type: 'email',
            unique: true
        },

        /* --- RELATIONS --- */

        activities: {
            collection: 'activity',
            via: 'user'
        },

        collections: {
            collection: 'collection',
            via: 'author'
        },

        reviews: {
            collection: 'review',
            via: 'author'
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