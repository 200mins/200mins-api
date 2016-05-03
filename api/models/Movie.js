/**
 * Movie.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {

        /* --- ATTRIBUTES --- */

        // Unique

        imdbID: {
            type: 'string',
            required: true,
            unique: true
        },

        // Required

        coverURL: {
            type: 'string',
            url: true,
            required: true
        },

        genres: {
            type: 'array',
            required: true
        },

        imdbRating: {
            type: 'float',
            max: 10,
            min: 0,
            required: true
        },

        mpaRating: {
            type: 'string',
            defaultsTo: null
        },

        runtime: {
            type: 'integer',
            min: 0,
            required: true
        },

        title: {
            type: 'string',
            required: true
        },

        year: {
            type: 'integer',
            max: 2017,
            min: 1890,
            required: true
        },

        /* --- RELATIONS --- */

        activities: {
            collection: 'activity',
            via: 'movie'
        }

    }

};