const mongoose = require('mongoose');
const Book = new mongoose.Schema({

ID: {
  
  type: Number
       },   
firstName: {
  type: String
 },
lastName: {
  type: String
 },
email: {
  type: String
 },
 address: {
  type: String
 },
 phoneNumber: {
    type: String
   },
});
module.exports = mongoose.model('user',Book);