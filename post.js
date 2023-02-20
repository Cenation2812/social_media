const express = require('express');
const router = express.Router();
const postModel = express.Router();


router.get("/comments/:post_id",(req,res)=>{
    let postid = req.params.post_id;

    postModel.find({id:postid})
    .then((comments)=>{
        res.send(comments);
    })
    .catch((err)=>{
        console.log(err);
        res.send("Some issue in getting the comments");
    })
})

router.post("/comments/:post_id",(req,res)=>{
    let posts = req.body;

    postModel.create(posts)
    .then((msg)=>{
        res.send(msg);
    })
    .catch((err)=>{
        res.send("Some issue while posting");
    })
})

module.exports = router;