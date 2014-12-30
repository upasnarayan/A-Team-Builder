var express = require('express');

module.exports = function(app){

    app.set('view engine', 'html');

    app.engine('html', require('ejs').renderFile);

    app.set('views', __dirname + '/html');

    app.use(express.static(__dirname + '/public'));
};