const mongoose = require('mongoose')



const PostSchema = new mongoose.Schema(
    {

        PostID: {
            type: String,
            required: false
            },

        PostSubject: {
            type: String,
            required: false
            },
        PostDate: {
                type: String,
                required: false
                },  
        PostTopic: {
                type: String,
                 required: false
                    },          
        PostUser: {
                type: String,
                required: false
                        }, 
        PostText: {
                   type: String,
                    required: false
                       }, 
                       date: {
                        type: Date,
                        default: Date.now
                      }               
     });

module.exports = mongoose.model('Post', PostSchema);

// module.exports =