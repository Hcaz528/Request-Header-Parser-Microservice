var express = require('express');
var app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views')

app.use(express.static('public'));

app.get("*", function (request, response) {
  // response.render('index',{ ipaddress: (request.headers['x-forwarded-for']).split(',')[0],
  //                language: (request.headers["accept-language"]).split(',')[0],
  //               software: (request.headers["user-agent"]).split('(')[1].split(')')[0]});
  response.json({ ipaddress: (request.headers['x-forwarded-for']).split(',')[0],
                 language: (request.headers["accept-language"]).split(',')[0],
                software: (request.headers["user-agent"]).split('(')[1].split(')')[0]});
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});