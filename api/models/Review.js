/**
 * Review.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {

        /* --- ATTRIBUTES --- */

        // Required

        movie: {
            type: 'json',
            required: true
        },

        rating: {
            type: 'integer',
            min: 0,
            max: 10,
            required: true
        },

        reaction: {
            type: 'string',
            enum: ['rofl', 'happy', 'scared', 'amazed', 'sad', 'annoyed'],
            required: true
        },

        // Optional

        comment: {
            type: 'text'
        },

        /* --- RELATIONS --- */

        user: {
            model: 'user',
            required: true
        }

    }

};