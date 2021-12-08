const mongoose = require ('mongoose')

const ApptSchema = new mongoose.Schema({

name: {
type: String,
required: true
},
email: {
 type: String,
 required: true
  },

date: {
  type: String,
  required: true
 },
 

Done:{
  type:Boolean ,
  default: false
},






});

const Appointment = mongoose.model('Appt', ApptSchema);


module.exports = Appointment;