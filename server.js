'use strict'

const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const mongoose = require('mongoose');

var Vote = require('./model/votes');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//db config
var mongoDB = 'mongodb://heroku:seven@ds227035.mlab.com:27035/secretgig-votes';
mongoose.connect(mongoDB, { useMongoClient: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//and remove cacheing so we get the most recent votes
 res.setHeader('Cache-Control', 'no-cache');
 next();
});


app.get('/votes', function(req, res) {
  Vote.find(function(err, votes) {
    if (err)
      res.send(err);
    res.json(votes)
  });
})

app.get('/votes/:id', function(req, res) {
  Vote.findById(req.params.id, function(err, vote) {
    if (err)
      res.send(err);
    res.json(vote)
  });
})

app.put('/votes/:id', function(req, res) {
  console.log(req.body);
  Vote.findByIdAndUpdate(
    req.params.id, 
    {$set: {'votesForA': req.body.votesForA, 'votesForB': req.body.votesForB}}, 
    {new: true},
    function(err,user) {
      if(err){
          res.json({error :err}) ; 
      } else{
          res.send(user) ; 
      }
    }
  );
});
  // Vote.findById(req.params.id, function(err, vote) {
  //   if (err) 
  //     res.status(500).send(err);
  //   else {
  //     vote.vote = vote.vote;
  //     vote.optionA = vote.optionA;
  //     vote.optionB = vote.optionB;
  //     vote.votesForA = req.body.votesForA || vote.votesForA;
  //     vote.votesForB = req.body.votesForB || vote.votesForB;
  //     vote.aURL = vote.aURL;
  //     vote.bURL =vote.bURL;
      
  //     vote.save(function(err) {
  //       if (err)
  //         res.status(500).send(err);
  //       res.status(200).send(vote);
  //     });
  //   }
  // });

app.listen(process.env.PORT || 8080, function() {
  console.log(`api running on port ${process.env.PORT || 8080}`);
});