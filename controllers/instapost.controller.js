const mongoose = require('mongoose');
const shortid = require('shortid');
const check = require('../lib/checkLib');
const response = require('./../lib/responseLib');
const logger = require('./../lib/loggerLib');
const time = require('./../lib/timeLib');
const jwt_decode = require('jwt-decode');
const multer = require('multer');

// User Model
const UserModel = mongoose.model('User');

// InstaPost Model
const InstaPostModel = mongoose.model('InstaPost');


// create Insta Post
let createPost = async (req, res) => {

    try {

        let token = req.headers.authtoken;
        let decodedToken = await jwt_decode(token);
        let currUsername = await decodedToken.data.username;

        // Find Current Logged in User Details
        let currentUserObj = await UserModel.findOne({
            username: currUsername
        });

        let image = {};
        image.url = req.file.url;
        image.id = req.file.public_id;

        let newPost = await new InstaPostModel({
            _id: new mongoose.Types.ObjectId(),
            post_caption: req.body.post_caption,
            posted_by: currentUserObj.username,
            post_image: image.url,
            created_on: time.now()
        })

        newPost.save((err, newPost) => {
            if (err) {
                console.log(err);
                logger.error(err.message, 'instaPostController: createPost', 10);
                let apiResponse = response.generate(true, 'Failed to create new Post', 500, null);
                return res.status(500).send(apiResponse);
            } else {
                newPostObj = newPost.toObject();
                res.status(201).send(newPostObj);
                console.log(newPostObj);
            }
        });
    } catch (error) {
        console.log(error);
        return res.send(error);
    }
} // end of create Post


// get all Posts

let getAllPosts = async (req, res) => {

   const posts = await InstaPostModel.find({});

   const postMap = [];

   posts.forEach((post) => {
       postMap.push(post);
   })

   res.send(postMap.reverse());


}

let likePost = async (req, res) => {
   const post = await InstaPostModel.findOne({ _id: req.body.post_id });
   res.send(post); 

}





















module.exports = {
    createPost,
    getAllPosts,
    likePost
}
