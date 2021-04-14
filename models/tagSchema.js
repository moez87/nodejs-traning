const mongoose = require('mongoose');
const tutorialSchem = require('./tutorialSchem');
const tagSchema = mongoose.Schema({
    Title: String,
    description: String,
    tutorials:[{ type: mongoose.Schema.Types.ObjectId,
        ref:"tutorial",
        ref:"Tuto"
    }]

}, {

    versionKey: false,
    timestamps: true

});

module.exports = mongoose.model('tags', tagSchema)