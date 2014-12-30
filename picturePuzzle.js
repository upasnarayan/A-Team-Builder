var fs = require('fs');
var gm = require('gm').subClass({imageMagick: true});
var sj = require('shelljs');
var http = require('http');


function getImagePath(req) {
	
	var img = req.body.imageKey;
console.log(img);
        var buff = req.body.imageKey.replace(/^data:image\/(png|gif|jpeg);base64,/, 		'');
        buff = buff.replace(/ /g, '+');
        fs.writeFile('./tmp/image.jpg', buff, 'base64', function(err) {
         });
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function splitImage(num, imgPath) {
    var result = sj.exec("slice-image ./tmp/image.jpg " + num, {silent:true}).output;
   // console.log(result[0]);
}


module.exports = function(app){
    app.get('/picturePuzzle', function(req, res) {
        res.render('picturePuzzle');
    });

    app.post('/getPicture', function(req, res) {
	getImagePath(req);

        fs.readFile('./tmp/team.csv', function(err, data) {

            var mailer = require("nodemailer");
            var smtpTransport = mailer.createTransport({
                service: "Gmail",
                auth: {
                    user: "ateambuilder1@gmail.com",
                    pass: "hophacks2014"
                }
            });

            var members = data.toString().split("\n");
	    splitImage(members.length - 1);
	    var picsToSend = ["1_01.png", "1_02.png", "2_01.png", "2_02.png"];
            var order = [0, 1, 2, 3];
	    order = shuffleArray(order);
	    console.log(order);
            for (var i = 0; i < members.length; i++) {
              var memberinfo = members[i].split(",");
              console.log(memberinfo[0]);

              var mail = {
                from: "A-Team Builder",
                to: memberinfo[2],
                subject: "Puzzle Piece " + (i + 1),
                text: memberinfo[0].split(" ")[0] +  ", team up with your team members to find out where to meet!",
                attachments: [
                    {
                        // TODO randomly get picture
                        //path: './Joshua.jpg'
			path: "./tmp/image_0" + picsToSend[order[i]]
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
            }
        });

        // var img = req.body.imageKey;
        // var buff = req.body.imageKey.replace(/^data:image\/(png|gif|jpeg);base64,/, '');
        // buff = buff.replace(/ /g, '+');
        // fs.writeFile('./tmp/image.jpg', buff, 'base64', function(err) {
        //     console.log("okay");
        //     splitImage(4);
        // });
        // // image splitter
        // var mailer = require("nodemailer");
        // var smtpTransport = mailer.createTransport({
        //     service: "Gmail",
        //     auth: {
        //         user: "ateambuilder1@gmail.com",
        //         pass: "hophacks2014"
        //     }
        // });
        // var mail = {
        //     from: "Joshua jshuay You",
        //     to: "adwong.jhu@gmail.com",
        //     subject: "test2",
        //     text: "Hey jorge, can you see the picture?",
        //     attachments: [
        //         {
        //             path: './Joshua.jpg'
        //         }
        //     ]
        // };
        // var mail1 = {
        //     from: "Joshua jshuay You",
        //     to: "adwong.jhu@gmail.com",
        //     subject: "test2",
        //     text: "Hey jorge, can you see the picture?",
        //     attachments: [
        //         {
        //             path: './Mudd1.jpg'
        //         }
        //     ]
        // };
        // var mail2 = {
        //     from: "Joshua jshuay You",
        //     to: "upasnarayan@gmail.com",
        //     subject: "test2",
        //     text: "Hey jorge, can you see the picture?",
        //     attachments: [
        //         {
        //             path: './Mudd2.jpg'
        //         }
        //     ]
        // };
        // var mail3 = {
        //     from: "Joshua jshuay You",
        //     to: "azpoliak@gmail.com",
        //     subject: "test2",
        //     text: "Hey jorge, can you see the picture?",
        //     attachments: [
        //         {
        //             path: './Mudd3.jpg'
        //         }
        //     ]
        // };
        // var mail4 = {
        //     from: "Joshua jshuay You",
        //     to: "jshuay@gmail.com",
        //     subject: "test2",
        //     text: "Hey jorge, can you see the picture?",
        //     attachments: [
        //         {
        //             path: './Mudd4.jpg'
        //         }
        //     ]
        // };
        // smtpTransport.sendMail(mail1, function(error, response) {
        //     if (error) {
        //         console.log(error);
        //     } else {
        //         console.log("message sent");
        //     }
        // });
        // smtpTransport.sendMail(mail2, function(error, response) {
        //     if (error) {
        //         console.log(error);
        //     } else {
        //         console.log("message sent");
        //     }
        // });
        // smtpTransport.sendMail(mail3, function(error, response) {
        //     if (error) {
        //         console.log(error);
        //     } else {
        //         console.log("message sent");
        //     }
        // });
        // smtpTransport.sendMail(mail4, function(error, response) {
        //     if (error) {
        //         console.log(error);
        //     } else {
        //         console.log("message sent");
        //     }
        // });
        // smtpTransport.close();

        //send image text
    });
};
