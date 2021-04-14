const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    address: String,
    zipCode: String,
    city: String,
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
}, {

    versionKey: false,
    timestamps: true

});

module.exports = mongoose.model('usersDetails', userSchema)