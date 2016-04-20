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

        activity: {
            type: 'json',
            required: true
        },

        supportingData: {
            type: 'json',
            required: true
        },

        /* --- RELATIONS --- */

        user: {
            model: 'user',
            required: true
        }

    }

};