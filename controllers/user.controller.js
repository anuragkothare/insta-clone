const express = require('express');

let helloWorldFunc = (req, res) => res.send('Hello World');
let printExample = (req, res) => res.send('Print Example');

let testRoute = (req, res) => {
    console.log(req.params);
    res.send(req.params);
}

let testQuery = (req, res) => {
    console.log(req.query);
    res.send(req.query);
}

let testBody = (req, res) => {
    console.log(req.body);
    res.send(req.body);
}


module.exports = {
    helloWorldFunc,
    printExample,
    testRoute,
    testQuery,
    testBody
}