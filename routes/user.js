const express = require('express');
const router =express.Router();
const userController = require('../controllers/user.controller');
const appConfig = require('../config/appConfig');
const auth = require('./../middleware/auth');

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/users`;

    // Defining Routes



    app.get(baseUrl + '/hello', userController.helloWorldFunc);

    app.post(`${baseUrl}/signup`, userController.signUpFunction);

    app.post(`${baseUrl}/login`, userController.loginFunction);
    

    
}

