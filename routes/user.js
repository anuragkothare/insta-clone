const express = require('express');
const router =express.Router();
const userController = require('../controllers/user.controller');
const appConfig = require('../config/appConfig');

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/users`;

    app.get(baseUrl + '/hello', userController.helloWorldFunc);
    app.get(baseUrl + '/example', userController.printExample);

    app.get(baseUrl + '/test/route/:param1/:param2', userController.testRoute);
    app.get(baseUrl + '/test/query', userController.testQuery);
    app.get(baseUrl + '/test/body', userController.testBody);
}

