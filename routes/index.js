const express = require('express');

// Import modular routers for api and html routes
const apiRoutes = require('./apiRoutes');
const htmlRoutes = require('./htmlRoutes');

const app = express();

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

module.exports = app;
