'use strict';
const express = require('express');
const serveStatic = require('serve-static');
const compression = require('compression');

const _port = process.env.PORT || 9090;
const _app_folder = 'dist/application';
const env = {
  graphSRV: 'http://localhost:8080'
};

const app = express();
app.use(compression());

// ---- SERVE ENVIRONMENT VARIABLES ---- //
app.all('/api/env', function (req, res) {
  res.json(env);
});


// ---- SERVE STATIC FILES ---- //
app.use(serveStatic(_app_folder, {
  maxAge: '1y',
  // setHeaders: setCustomCacheControl
}));


// ---- SERVE APLICATION PATHS ---- //
app.all('*', function (req, res) {
  res.status(200).sendFile(`/`, {root: _app_folder});
});





// ---- START UP THE NODE SERVER  ----
app.listen(_port, function () {
    console.log('Node Express server for ' + app.name + ' listening on http://localhost:' + _port);
});
