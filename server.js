'use strict';

var port = process.env.PORT = process.env.PORT || 3000;
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var timetable = require('./timetable');

var app = express();
app.use(express.static('src/'));
app.use(bodyParser.json());

app.get('/api/timetable', function(req, res, next){
  return res.json(timetable);
});

app.post('/api/timetable', function(req, res, next){
  var body = req.body;
  if(!body) return res.status(403).send('Pas de body.');

  var index = body.index;
  var activity = body.activity;
  var hours = body.hours;

  if(index === undefined || !activity || !hours) return res.status(403).send('Body invalide.');
  timetable[index].activities.push({
    label: activity,
    hours: hours
  });

  res.end();
});

var server = http.createServer(app);
server.listen(port, function(){
  console.log('Polyblab server running on port %s', port);
});