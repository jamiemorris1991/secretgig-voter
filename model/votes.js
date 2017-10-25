'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VotesSchema = new Schema({
  _id: Number,
  vote: Number,
  optionA: String,
  optionB: String,
  votesForA: Number,
  votesForB: Number,
  aURL: String,
  bURL: String
});

//export our module to use in server.js
module.exports = mongoose.model('Vote', VotesSchema);