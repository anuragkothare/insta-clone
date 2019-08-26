const express = require('express');
const appConfig = require('./config/appConfig');
const fs = require('fs');

// const user =require('./routes/user');

const app = express();

// Bootstraping Routes
let routesPath = './routes';
fs.readdirSync(routesPath).forEach(function (file) {
    if (~file.indexOf('.js')) {
        console.log('including the following file');
        console.log(routesPath + '/' + file);
        let route =require(routesPath + '/' + file);
        route.setRouter(app);
    }
})

app.listen(appConfig.port, () => console.log('App listening on port ' + appConfig.port));

