const express=require('express');
const {adminAuth,userAuth}=require('./middlewares/auth')

const app=express()

app.use("/admin",adminAuth)

app.use("/user/:token",userAuth,(req,res)=>{
      res.send("From user")
})

app.use("/admin/getUserData",(req,res)=>{
    res.send("User data sent")
})

app.use("/admin/deleteUserData",(req,res)=>{
    res.send("User data deleted")
})




app.listen(3000,()=>{
    console.log("Server is Running")
})