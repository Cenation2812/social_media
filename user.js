const express = require('express');
const router = express.Router();
const userModel = require('../models/user-model');
const connectionModel = require('../models/connection-model');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer')




router.post('/create',(req,res)=>{
    let userData = req.body;

    bcrypt.genSalt(10,(err,salt)=>{
        if(err === null || err === undefined)
        {
            bcrypt.hash(userData.password,salt,(err,encPass)=>{
                if(err === null || err === undefined)
                {
                    userData.password = encPass;

                    userModel.create(userData)
                    .then((msg)=>{
                        
                        const transporter = nodemailer.createTransport({
                            service:"gmail",
                            auth:{
                                user:"dd5844477@gmail.com",
                                pass:"kocvgyfqmaqaanbz"
                            }
                        
                        });
                        
                        var mailContent = {
                            from:"dd5844477@gmail.com",
                            to:userData.email,
                            subject:"Sample mail",
                            text:"Hello this is an auto generated email"
                        }
                        
                        transporter.sendMail(mailContent,(error,response)=>{
                            if(error)
                            {
                                console.log(error);
                            }
                            else
                            {
                                console.log("mail sent")
                                res.send({msg:"User created successfully"});
                            }
                        })
                    })
                    .catch((err)=>{
                        console.log(err);
                        console.log("Some problem");
                        res.send("User cannot be created");
                    })

                }
            })
        }
    })


    
})

router.get("/",(req,res)=>{
    userModel.find()
    .then((data)=>{
        res.send(data);
    })
    .catch((err)=>{
        console.log(err);
    })
})

router.get("/:user_id",(req,res)=>{
    let userid = req.params.user_id;

    userModel.findOne({id:userid})
    .then((data)=>{
        res.send(data);
    })
    .catch((err)=>{
        console.log(err);
    })
})

router.get("/follow_requests/:user_id",(req,res)=>{
    let userid = req.params.user_id;

    connectionModel.find({following:userid})
    .then((users)=>{
        res.send(users); 
    })
    .catch((err)=>{
        console.log(err);
    })
})

router.put("/accept_status/:conn_id",(req,res)=>{
    let connection_id = req.params.conn_id;

    let updateData = {
        status: "accepted"
    }
    connectionModel.updateOne({id:connection_id},updateData)
    .then((msg)=>{
        res.send("Pending connection updated successfully");
    })
    .catch((err)=>{
        console.log(err);
    })
    
})

router.delete("/delete_status/:conn_id",(req,res)=>{
    let connection_id = req.params.conn_id;

    connectionModel.remove({id:connection_id})
    .then((msg)=>{
        res.send("request deleted successfully");
    })
    .catch((err)=>{
        console.log(err);
    })
})

module.exports = router;