var express = require('express');
let path = require('path');
var app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views')


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'scripts')));



app.get("/getIP", function (request, response, next) {
  response.json({ ipaddress: (request.headers['x-forwarded-for']).split(',')[0],
                 language: (request.headers["accept-language"]).split(',')[0],
                software: (request.headers["user-agent"]).split('(')[1].split(')')[0]});
  next();
});

app.get("*", function (request, response, next) {
  response.render('index', {});
  next();
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});