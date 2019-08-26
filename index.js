const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// importing config file 
const appConfig = require('./config/appConfig');

// creating application instance
const app = express();


// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: false} ));
app.use(cookieParser());

// Bootstrap Routes
let routesPath = './routes';
fs.readdirSync(routesPath).forEach(function (file) {
    if (~file.indexOf('.js')) {
        console.log('including the following file');
        console.log(routesPath + '/' + file);
        let route =require(routesPath + '/' + file);
        route.setRouter(app);
    }
})


// Bootstrap Models
let modelsPath = './models';
fs.readdirSync(modelsPath).forEach(function (file) {
    if (~file.indexOf('.js')) require(modelsPath + '/' + file);
})

app.listen(appConfig.port, () => {
    console.log('App listening on port ' + appConfig.port);
    let db = mongoose.connect(appConfig.db.uri, { useNewUrlParser: true });
})

// handling mongoose connection error
mongoose.connection.on('error', function (err) {
    console.log('database connection error');
    console.log(err);
});


// handling mongoose success event
mongoose.connection.on('open', function(err) {
    if(err) {
        console.log('database error');
        console.log(err)
    } else {
        console.log('databse connection open success');
    }
})
