const mongoose = require ('mongoose')

const UserSchema = new mongoose.Schema({

name: {
type: String,
required: true
},
email: {
 type: String,
 required: true
  },
password: {
type: String,
required: true
 },
id:{
type: String,
required: true
},
age: {
  type: Date,
   },
date: {
type: Date,
 },
 avatar: {
  type: String,
  default:'https://www.w3schools.com/howto/img_avatar.png',
   },
  


     // HTML 
CHECKB1: {
  type: Boolean,
  default: false
  },
CHECKB2: {
 type: Boolean,
  default: false
  },              
CHECKB3: {
  type: Boolean,
default: false
},
CHECKB4: {
  type: Boolean,
   default: false
   },              
 CHECKB5: {
   type: Boolean,
 default: false
 },

CHECKBF: {
type: Boolean,
default: false
 },

 HTML: {
  type: Boolean,
  default: false
   },


 // CSS Basic   
CSSBasic: {
  type: Boolean,
  default: false
   },

 // CSS Intermediate      
CSSIntermediate: {
  type: Boolean,
  default: false
},
 // CSS Advanced        
CSSAdvanced: {
  type: Boolean,
  default: false
   },

 // Javascript Basic    
JSBasic: {
  type: Boolean,
  default: false
   },
    
 // Javascript InterMediate  
 JSIntermediate: {
  type: Boolean,
  default: false
   },
 // Javascript Advanced
 JSAdvanced: {
  type: Boolean,
  default: false
   },
 // Server Side Basic
 BackendBasic: {
  type: Boolean,
  default: false
   },
 // Server Side Advanced
 BackendAdvanced: {
  type: Boolean,
  default: false
   },



  // Level
 Value: {
    type:Number ,
    default: 0
     },
   // Practices 
Practices: {
    type:Number ,
    default: 0
     },
Objectives:{
  type:Number ,
  default: 0
},

Appointments:{
  type:Boolean ,
  default: false
},
AppointDate:{
  type:String ,
  default: "No Appointments to show"
},


 Progress: 
 {
                  HTML: {
                    type: Boolean,
                    default: true
                  },
                  CSSbasic: {
                    type: Boolean,
                    default:false
                  },
                  CSSIntermediate: {
                    type: Boolean,
                    default:false
                  },
                  CSSAdvanced: {
                    type: Boolean,
                    default:false
                  },
                  JavascriptB: {
                    type: Boolean,
                   default:false
                  },
                  JavascriptM: {
                    type: Boolean,
                   default:false
                  },
                  JavascriptA: {
                    type: Boolean,
                   default:false
                  },

                  ServerSideB: {
                    type: Boolean,
                   default:false
                  },
                  ServerSideA: {
                    type: Boolean,
                   default:false
                  },
                  to: {
                    type: Date
                  },
                  current: {
                    type: Boolean,
                    default: false
                  },
                 FinalStatus: {
                    type: String
                  }
                }
              ,
            Posts: [
                {
                  username: {
                    type: String,
                    required: false
                  },
                  post: {
                    type: String,
                    required: false
                  },
                  likes: {
                    type: String,
                    required: false
                  },
                  
                  comments: {
                    type: String
                  }
                }
              ],
            
              date: {
                type: Date,
                default: Date.now
              }


});

const User = mongoose.model('User', UserSchema);


module.exports = User;