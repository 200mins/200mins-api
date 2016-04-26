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
            type: 'number',
            required: true
        },

        runtime: {
            type: 'number',
            required: true
        },

        title: {
            type: 'string',
            required: true
        },

        year: {
            type: 'number',
            required: true
        },

        yifyID: {
            type: 'string',
            required: true
        },

        /* --- RELATIONS --- */

        activities: {
            collection: 'activity',
            via: 'movie'
        }

    }

};