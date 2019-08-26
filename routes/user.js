const express = require('express');

const userController = require('../controllers/user.controller');

let setRouter = (app) => {

    app.get('/hello', userController.helloWorldFunc);
    app.get('/example', userController.printExample);
}

module.exports = {
    setRouter
}