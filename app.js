var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser());

//http.createServer(app).listen(0923, '10.188.190.199');
http.createServer(app).listen(0923, '10.200.3.109');
// TODO: change above to your ip with ipconfig on windows

require('./config')(app);
require('./index')(app);
require('./gvoice')(app);
require('./picturePuzzle')(app);
require('./anagram')(app);
require('./mathPuzzle')(app);
require('./team')(app);
require('./submitted')(app);
