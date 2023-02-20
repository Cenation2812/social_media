const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    posts:[String],
    caption:{
        type:String,
        required:true
    },
    user:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"users"
   },
   tags:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users"
   }
},{timestamps:true});

const postModel = mongoose.model("posts",postSchema);

module.exports = postModel;