var GV = require('./google-voice');
var client = new GV.Client({
    email: 'ateambuilder1@gmail.com',
    password: 'hophacks2014'
});
module.exports = function(app){
    app.get('/testGVoice', function(req, res) {
        client.connect('sms', {outgoingNumber:['9493786900'], text: 'Hey, this is sent from the server :D'}, function(error, response, body) {
            var data = JSON.parse(body);
            if (error || !data.ok) {
                res.send('an error has occured');
            } else {
                res.send('success');
            }
        });
    });

    app.get('/mail', function(req, res) {
        var mailer = require("nodemailer");
        var smtpTransport = mailer.createTransport({
            service: "Gmail",
            auth: {
                user: "ateambuilder1@gmail.com",
                pass: "hophacks2014"
            }
        });

        var mail = {
            from: "Joshua jshuay You",
            to: "2016943578@vzwpix.com",
            subject: "test",
            text: "Hey jorge, can you see the picture?",
            attachments: [
                {
                    path: './Joshua.jpg'
                }
            ]
        };

        smtpTransport.sendMail(mail, function(error, response) {
            if (error) {
                console.log(error);
            } else {
                console.log("message sent");
            }
        });

        smtpTransport.close();
    });

    app.get('/count', function(req, res) {
        setInterval(function() {
            client.get('sms', null, function(error, response) {
                if(error) {
                    console.log('Error: ', error);
                } else {
                    console.log('There are', response.unreadCounts.sms, 'messages in the sms. The last', response.messages.length, ' messages are:');
                    response.messages.forEach(function(msg, index) {
                        if (!msg.isRead) {
                            console.log(msg.thread[msg.thread.length - 1].text);
                            client.set(msg.isRead, true);
                        }
                        console.log(msg.isRead ? ' ' : '*', (index + 1) + '.', msg.displayStartDateTime, msg.displayNumber);
                    });
                }
                //res.send('hi');
            });
        }, 1000);
    });
};