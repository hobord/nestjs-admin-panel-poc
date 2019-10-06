'use strict';
const express = require('express');
const serveStatic = require('serve-static');
const compression = require('compression');
const cors = require('cors');

const _port = process.env.PORT || 9090;
const _app_folder = 'dist/application';
const env = {
  // graphSRV: 'http://localhost:8080'
  graphSRV: 'https://graphql-pokemon.now.sh/?'
};
// options for cors midddleware
const corsOptions = {
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,POST',
  origin: '*',
  preflightContinue: false
};

const app = express();
app.use(compression());
app.use(cors(corsOptions));

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
