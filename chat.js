const express = require('express');
const router = express.Router();
const chatModel = require("../models/chat-model");


router.get("/:uid",(req,res)=>{
    let user_id = req.params.uid;

    chatModel.find({$or:[{sender:user_id},{receiver:user_id}]})
    .then((chatData)=>{
        res.send(chatData);
    })
    .catch((err)=>{
        res.send("Some issue in the chats");
    })
})

module.exports = router;