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
      
              CHECK1: {
                type: Boolean,
                default: false
              },
              CHECK2: {
                type: Boolean,
                default: false
              },
              CHECK3: {
                type: Boolean,
                default: false
              },
              CHECK4: {
                type: Boolean,
                default: false
              },
              CHECK5: {
                type: Boolean,
                default: false
              },
              CHECK6: {
                type: Boolean,
                default: false
              },
              CHECK7: {
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
                  Javascript: {
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
            education: [
                {
                  school: {
                    type: String,
                    required: false
                  },
                  degree: {
                    type: String,
                    required: false
                  },
                  fieldofstudy: {
                    type: String,
                    required: false
                  },
                  from: {
                    type: Date,
                    required: false
                  },
                  to: {
                    type: Date
                  },
                  current: {
                    type: Boolean,
                    default: false
                  },
                  description: {
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