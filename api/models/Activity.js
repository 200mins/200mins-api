/**
 * Activity.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {

        /* --- ATTRIBUTES --- */

        // Required

        code: {
            type: 'string',
            enum: ['d', 's', 'l', 'r8', 'ra', 'rv', 'wn', 'wy'],
            required: true
        },

        description: {
            type: 'string',
            defaultsTo: null
        },

        karmaDelta: {
            type: 'int',
            required: true
        },

        /* --- RELATIONS --- */

        movie: {
            model: 'movie'
        },

        user: {
            model: 'user',
            required: true
        }

    }

};