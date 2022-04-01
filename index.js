const express = require('express');
const app = express();
const dotenv = require('dotenv');

// load env vars from root .env file
dotenv.config();

// instead of bodyparser setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api router
app.use('/api', require('./routes/api'));

const server = app.listen(process.env.APP_PORT || 3000, process.env.APP_HOST, () => {
    console.log(`Successfully connected to http://${process.env.APP_HOST}:${process.env.APP_PORT || 3000}...`);
});

module.exports = { app, server };
