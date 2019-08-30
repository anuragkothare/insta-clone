const mongoose = require('mongoose');

// import schema
const Schema = mongoose.Schema;

const instaPostSchema = new Schema({
    post_id: {
        type: String,
        default: '',
        index: true,
        unique: true,
    },
    title: {
        type: String,
        default: ''
    },
    posted_by: {
        // type: mongoose.Schema.Types.ObjectId, ref: 'User'
        type: String
    },
    post_image: {
        type: String,
        required:true
    },
    likes: {
        type: Number,
        default: 0
    },
    created_on: {
        type: Date
    }
    
})

module.exports = mongoose.model('InstaPost', instaPostSchema);