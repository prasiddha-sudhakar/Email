const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var nodemailer = require('nodemailer');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(request, response){
response.sendFile(__dirname + "/email.html");
});

app.post("/", function(request, response) {

  var email = request.body.email;
  var message = request.body.message;
  // var password = request.body.password;

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ENTER USED EMAIL HERE',
      pass: 'ENTER PASSWORD HERE'
    }
  });

  var mailOptions = {
    from: ' EMAIL HERE',
    to: 'SENDER EMAIL HERE',
    subject: 'A user has contacted you',
    text: "This user " + email + " has contacted you with " + message
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      response.send("Email sent " + info.response);
    }
  });

});

app.listen(2025, function(){
  console.log("Sever started on port 2025")
});
