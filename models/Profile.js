const mongoose = require('mongoose')



const ProfileSchema = new mongoose.Schema({
  UserID: {
    type: String
  },


Proficiency: {
    type: String
  },
  TimeZone: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: false
  },
  skills: {
    type: [String],
    required: false
  },
  bio: {
    type: String
  },
  githubusername: {
    type: String
  },

Progress: [
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
  ],
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

module.exports = mongoose.model('Profile', ProfileSchema);