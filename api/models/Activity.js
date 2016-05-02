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
            required: true
        },

        description: {
            type: 'string',
            defaultsTo: null
        },

        karmaDelta: {
            type: 'integer',
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