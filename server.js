'use strict';

var argv = require('yargs').argv;
var express = require('express');
var path = require("path");
var fs = require('fs');
var xtend = xtend = require('xtend/mutable');

xtend(process.env, require('./etc/env'));

var app = express();

app.set('views', __dirname + '/');
app.engine('html', require('ejs').renderFile);
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.static(__dirname + '/'));
app.use(app.router);


/**
 * Index Route
 */
app.get('*', function(req, res) {
    res.render('/index.html');
});


//you may also need an error handler too (below), to serve a 404 perhaps?
app.use(function(err, req, res, next) {
    if ( ! err) {
        return next();
    }

    console.log('error: ' + err.stack);
    res.send('error!!!');
});

/**
 * Start server
 */
app.listen(process.env.NODE_PORT || 8010, function() {
    console.log('listening on port %d using %s ', process.env.NODE_PORT || 8010, app.get('env'));
});;