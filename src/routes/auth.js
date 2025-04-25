const express=require('express');
const {validateSignup}=require('../utils/validateSignup')
const bcrypt=require('bcrypt')
const User=require('../models/user')
const authRouter=express.Router();

authRouter.post('/signup',async (req,res)=>{
    const {firstName,lastName,email,password,age}=req.body
        try{
            validateSignup(req)
            const passwordHash=await bcrypt.hash(password,10)
            const user=new User({
                firstName,lastName,email,password:passwordHash,age
            })
            await  user.save();
            res.send("User added successfully!!")
        }
        catch(err){
            res.status(400).send("Error saving user"+ err)
        }
  
})

authRouter.post('/login',async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await User.findOne({email:email})
        if(!user) {
            throw new Error("Invalid credentials")
        }

        const isPasswordValid=await user.validatePasswordHash(password)
        

        if(!isPasswordValid) {
            throw new Error("Invalid credentials")
        } else {
            //JWT 
           const token= await user.getJWT()

            res.cookie("token",token)
            res.send(user)
        }

    } catch (err) {
        res.status(400).send(`${err}`)
    }
} )

authRouter.post('/logout',async(req,res)=>{
    res.cookie('token', null, {expires:new Date(Date.now())})
    res.send("Logout successfull")
})

module.exports=authRouter