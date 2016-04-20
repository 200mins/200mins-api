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

        comment: {
            type: 'text',
            required: true
        },

        movie: {
            type: 'json',
            required: true
        },

        rating: {
            type: 'integer',
            required: true
        },

        reaction: {
            type: 'string',
            enum: ['rofl', 'happy', 'scared', 'amazed', 'sad', 'annoyed'],
            required: true
        },

        /* --- RELATIONS --- */

        author: {
            model: 'user',
            required: true
        }

    }

};