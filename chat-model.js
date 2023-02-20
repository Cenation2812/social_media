const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    chat:{
        type:String,
    },
    sender:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"users"
   },
   receiver:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"users"
   }
},{timestamps:true});

const chatModel = mongoose.model("chats",chatSchema);

module.exports = chatModel;