const express = require('express');
const cors = require('cors');

const middlewares = [express.json, cors];


const setMiddleware = app =>{
    middlewares.forEach(middleware => {
        app.use(middleware())
    });
};
module.exports = setMiddleware;