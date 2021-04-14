const mongoose = require('mongoose');
const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
},{
    VersionKey: false,
    Timestampes: true
});

module.exports = mongoose.model('todo', todoSchema)