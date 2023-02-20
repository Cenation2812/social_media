const mongoose = require('mongoose');

const connectionSchema = mongoose.Schema({
    follower:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    following:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        enum:["accepted","pending","deleted"],
        default:"pending"
    }
},{timestamp:true});

const connectionModel = mongoose.model("connections",connectionSchema);

module.exports = connectionModel;