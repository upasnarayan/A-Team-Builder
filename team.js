var http = require('http');
var fs = require('fs');

module.exports = function(app){
    app.get('/team', function(req, res) {
        res.render('team');
    });

    app.post('/updateTeam', function(req, res) {
        var txt = req.body.memberData;
        fs.writeFile('./tmp/team.csv', txt, function(err) {
            console.log(err);
        });
    });

    app.get('/getTeam', function(req, res) {
    	fs.readFile('./tmp/team.csv', function(err, data) {
    		res.send(data);
    		console.log(err);
    	});
    });
};
