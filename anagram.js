var fs = require('fs');
var http = require('http');

function shuffle(o) { 
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

module.exports = function(app){
    app.get('/anagram', function(req, res) {
        res.render('anagram');
    });

    app.post('/sendAnagram', function(req, res) {
    	 var message = req.body.messageKey;
    	 fs.readFile('./tmp/team.csv', function(err, data) {

            var mailer = require("nodemailer");
            var smtpTransport = mailer.createTransport({
                service: "Gmail",
                auth: {
                    user: "ateambuilder1@gmail.com",
                    pass: "hophacks2014"
                }
            });


           	// message has to have same # of words as members

            var members = data.toString().split("\n");
            var messagebits = message.split(" ");
            messagebits = shuffle(messagebits);

            for (var i = 0; i < members.length; i++) {
              var memberinfo = members[i].split(",");
              console.log(memberinfo[0]);

              var mail = {
                from: "A-Team Builder",
                to: memberinfo[2],
                subject: "Puzzle Piece " + (i + 1),
                text: memberinfo[0].split(" ")[0] +  ", team up with your team members to crack the message!\n\n" +
                		"Your clue is: " + messagebits[i]
              };
              smtpTransport.sendMail(mail, function(error, response) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("message sent");
                }
              });
              smtpTransport.close();
            }
        });
    });
};
