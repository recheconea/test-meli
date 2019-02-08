const express = require('express');
const path = require('path');
const routes = require('./src/routes/');

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/', routes);

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);

