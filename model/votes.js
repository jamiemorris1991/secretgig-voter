'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VotesSchema = new Schema({
  optionA: String,
  OptionB: String,
  votesForA: String,
  votesForB: String,
  start: String,
  duration: String,
});

//export our module to use in server.js
module.exports = mongoose.model('Vote', VotesSchema);