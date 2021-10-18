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
date: {
type: Date,
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
CHECKBF: {
type: Boolean,
default: false
 },



 // CSS Basic   
CSSB1: {
  type: Boolean,
  default: false
   },
CSSB2: {
type: Boolean,
default: false
      },
CSSB3: {
  type: Boolean,
  default: false
   },
CSSB4: {
type: Boolean,
default: false
      },
CSSB5: {
  type: Boolean,
  default: false
   },
CSSBF: {
type: Boolean,
default: false
      },
 // CSS Intermediate      
CSSM1: {
  type: Boolean,
  default: false
   },
CSSM2: {
type: Boolean,
default: false
      },
CSSM3: {
  type: Boolean,
  default: false
   },
CSSM4: {
type: Boolean,
default: false
      },
CSSM5: {
  type: Boolean,
  default: false
   },
CSSMF: {
type: Boolean,
default: false
      },
 // CSS Advanced        
CSSA1: {
  type: Boolean,
  default: false
   },
CSSA2: {
type: Boolean,
default: false
      },

CSSAF: {
type: Boolean,
default: false
      },
 // Javascript Basic    
JSB1: {
  type: Boolean,
  default: false
   },
JSB2: {
type: Boolean,
default: false
      },
JSB3: {
  type: Boolean,
  default: false
   },
JSB4: {
type: Boolean,
default: false
      },

JSBF: {
type: Boolean,
default: false
      },      
 // Javascript InterMediate  
 JSM1: {
  type: Boolean,
  default: false
   },
JSM2: {
type: Boolean,
default: false
      },
JSM3: {
  type: Boolean,
  default: false
   },
JSSM4: {
type: Boolean,
default: false
      },

JSSMF: {
type: Boolean,
default: false
      },  
      
      



 Progress: 
 {
                  HTML: {
                    type: Boolean,
                    default: false
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