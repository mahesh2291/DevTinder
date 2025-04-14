const express=require('express');
const connectDB=require("./config/database");
const User = require('./models/user');
const app=express()


app.post('/signup',async (req,res)=>{
    console.log(req.body)
     const user=new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        emailId:req.body.emailId,
        password:req.body.password
     })
        try{
            await  user.save();
            res.send("User added successfully!!")
        }
        catch(err){
            res.status(400).send("Error saving user")
        }
  
})



connectDB().then(()=>{
    console.log("DB connection successful")
    app.listen(3000,()=>{
    console.log("Server is Running")
})
}).catch((err)=>{
   console.log("DB connection Failed:"+ err)
})

