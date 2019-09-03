const express = require('express');
const instapostController = require('../controllers/instapost.controller');
const appConfig = require('../config/appConfig');
const auth = require('./../middleware/auth');
const multer = require('multer');


// Multer Configuration
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true);
    // else reject
    } else {
        cb(null, false);
    }   
}

const upload = multer({storage: storage, limits: {
    fileSize: 1024 * 1024 * 5
},
fileFilter: fileFilter
});





module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/users`;

    // Defining Routes

    app.post(`${baseUrl}/post`,auth.isAuthorized, upload.single('post_image'), instapostController.createPost);

    app.get(`${baseUrl}/posts`, instapostController.getAllPosts);
     
}