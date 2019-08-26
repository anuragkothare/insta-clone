const express = require('express');

let helloWorldFunc = (req, res) => res.send('Hello World');
let printExample = (req, res) => res.send('Print Example');


module.exports = {
    helloWorldFunc,
    printExample
}