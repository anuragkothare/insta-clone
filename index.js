const express = require('express');
const appConfig = require('./config/appConfig');

const app = express();

let helloWorldFunc = (req, res) => res.send('Hello World');

app.get('/hello', helloWorldFunc);

app.listen(appConfig.port, () => console.log('App listening on port ' + appConfig.port));

