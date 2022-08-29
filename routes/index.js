const express = require('express');

// Import modular routers for api and html routes
const apiRouter = require('./apiRoutes');
const htmlRouter = require('./htmlRoutes');

const app = express();

app.use('/apiRoutes', apiRouter);
app.use('/htmlRoutes', htmlRouter);

module.exports = app;
