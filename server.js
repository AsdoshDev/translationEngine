// server.js
const express = require('express');
const app = express();
var path = require('path');
const compression = require('compression');
// Run the app by serving the static files
// in the dist directory
app.use(express.static(path.join(__dirname, 'dist')));
app.use(compression());
// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 8080);


