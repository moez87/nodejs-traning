const mongoose = require('mongoose');
const toturialSchema = mongoose.Schema({
    Title: String,
    description: String,
    tags:[{ type: mongoose.Schema.Types.ObjectId,
        ref:'tags'}]
    

}, {

    versionKey: false,
    timestamps: true

});

module.exports = mongoose.model('tutorial', toturialSchema)