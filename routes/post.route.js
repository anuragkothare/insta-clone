const express = require('express');
const instapostController = require('../controllers/instapost.controller');
const appConfig = require('../config/appConfig');
const auth = require('./../middleware/auth');
const multer = require('multer');
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");


// Cloudinary Code
cloudinary.config({
    cloud_name: "dhywpcyym",
    api_key: "557459989373116",
    api_secret: "rW58Mqizpjy2-tMAQXEBRpJsBsI"
});

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "demo",
    allowedFormats: ["jpg", "png", "jpeg"],
    transformation: [{
        width: 500,
        height: 500,
        crop: "limit"
    }]
});

const parser = multer({
    storage: storage
});


module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/users`;

    // Defining Routes

    app.post(`${baseUrl}/post`,auth.isAuthorized, parser.single('post_image'), instapostController.createPost);

    app.get(`${baseUrl}/posts`, instapostController.getAllPosts);

    app.put(`${baseUrl}/like/:post_id`, instapostController.likePost);

     
}