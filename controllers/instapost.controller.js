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


let createPost1 = async (req, res) => {

    try {

        let token = req.headers.authtoken;
        let decodedToken = await jwt_decode(token);
        let currUsername = await decodedToken.data.username;

        // Find Current Logged in User Details
        let currentUserObj = await UserModel.findOne({
            username: currUsername
        });

        let newPost = await new InstaPostModel({
            _id: new mongoose.Types.ObjectId(),
            post_caption: req.body.post_caption,
            posted_by: currentUserObj._id,
            post_image: req.file.path,
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
}


















// create InstaPost
let createPost = (req, res) => {
    return new Promise((resolve, reject) => {
        InstaPostModel.findOne({
                post_caption: req.body.post_caption
            })
            .exec((err, retrievedPostDetails) => {
                if (err) {
                    logger.error(err.message, 'instaPostController: instaPostController', 10);
                    let apiResponse = response.generate(true, 'Failed to create Post', 500, null);
                    reject(apiResponse);
                } else if (check.isEmpty(retrievedPostDetails)) {

                    console.log("Picture-value", req.file);

                    let token = req.headers.authtoken;
                    let decoded = jwt_decode(token);
                    console.log('Decoded token', decoded);
                    let newPost = new InstaPostModel({
                        _id: new mongoose.Types.ObjectId(),
                        post_caption: req.body.post_caption,
                        // posted_by: decoded.data.user_id,
                        post_image: req.file.path,
                        created_on: time.now()
                    })
                    newPost.save((err, newPost) => {
                        if (err) {
                            console.log(err);
                            logger.error(err.message, 'instaPostController: createPost', 10);
                            let apiResponse = response.generate(true, 'Failed to create new Post', 500, null);
                            reject(apiResponse);
                        } else {
                            newPostObj = newPost.toObject();
                            res.status(201).send(newPostObj);
                            console.log(newPostObj);
                        }
                    })
                } else {
                    logger.error('Post Cannot Be Created. Post Already Present with this post_id', 'instaPostController: instaPostController', 4);
                    let apiResponse = response.generate(true, 'Post Already Present With this Title', 403, null);
                    reject(apiResponse);
                    res.status(403).send(apiResponse);
                }
            })
    })
};

let likePost = (req, res) => {
    return new Promise((resolve, reject) => {
        InstaPostModel.findOne({
                post_id: req.body.post_id
            })
            .exec((err, retrievedPostDetails) => {
                if (err) {
                    logger.error(err.message, 'instaPostController: instaPostController', 10);
                    let apiResponse = response.generate(true, 'Failed to like Post', 500, null);
                    reject(apiResponse);
                } else {
                    let postObj = retrievedPostDetails;
                    let updateusLikes = postObj.likes + 1;
                    retrievedPostDetails.likes = updateusLikes;
                    retrievedPostDetails.save();
                    console.log(retrievedPostDetails);
                    res.send(retrievedPostDetails);
                }
            })
    })
}


module.exports = {
    createPost,
    createPost1,
    likePost
}
