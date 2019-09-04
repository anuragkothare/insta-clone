// importing mongoose 
const mongoose = require('mongoose');


// import schema
const Schema = mongoose.Schema;

let userSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId
    },
    first_name: {
        type: String,
        default: ''
    },
    last_name: {
        type: String,
        default: ''
    },
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        default: 'arhiwefkjsdbfkjsdbf'
    },
    created_on: {
        type: Date
    }
})


module.exports = mongoose.model('User', userSchema);
