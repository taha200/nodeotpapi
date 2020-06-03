const mongoose = require('mongoose');
const Schema = mongoose.Schema

const otpSchemasd = new mongoose.Schema({
 
     code:{
         type:String,     }
   });
 
   module.exports = mongoose.model('otpsam', otpSchemasd);