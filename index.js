const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');

// importing config file 
const appConfig = require('./config/appConfig');


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
