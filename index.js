const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const chatRouter = require('./routes/chat');
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/clickpic")
.then((res)=>{
    console.log("Database connected");
})
.catch((err)=>{
    console.log(err);
})

app.use(cors())
app.use(express.json());


app.use("/user",userRouter);
app.use("/post",postRouter);
app.use("/chat",chatRouter);

app.listen(8000,()=>{
    console.log("Server is up and running");
})