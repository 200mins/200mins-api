/**
 * Collection.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {

        /* --- ATTRIBUTES --- */

        // Required

        isFeatured: {
            type: 'boolean',
            defaultsTo: false
        },

        isFranchise: {
            type: 'boolean',
            defaultsTo: false
        },

        movies: {
            type: 'array',
            required: true
        },

        name: {
            type: 'string',
            required: true
        },

        /* --- RELATIONS --- */

        user: {
            model: 'user',
            required: true
        }

    }

};