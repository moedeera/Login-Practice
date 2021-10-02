const mongoose = require('mongoose')



const ListSchema = new mongoose.Schema(
    {
  
    userId:[ { 
        type: String}

  
  



]});

module.exports = mongoose.model('List', ListSchema);