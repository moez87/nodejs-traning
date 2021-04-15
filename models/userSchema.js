const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    age: Number,
    photo: String,

    usersDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usersDetails"
    },
    todos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "todo"
        }
    ]

}, {

    versionKey: false,
    timestamps: true

});

module.exports = mongoose.model('users', userSchema)