const express=require('express')
const { userAuth } = require('../middlewares/auth')
const {validateEditProfileData}= require('../utils/validateSignup')
const bcrypt=require('bcrypt')

const profileRouter=express.Router()

profileRouter.get('/profile/view',userAuth,async(req,res)=>{
    try {
        const user=req.user
    res.send(user)
} catch (err) {
    res.status(400).send('Error'+ err)
}
})

profileRouter.patch('/profile/edit',userAuth,async(req,res)=>{
     try {
      if(!validateEditProfileData(req)){
        throw new error("Invalid edit request")
      }
      const user=req.user

      Object.keys(req.body).forEach((key)=>(user[key]=req.body[key]))

      await user.save();

      res.send(`${user.firstName} profile updated successfully`)

     } catch (err) {
        res.status(400).send(err)
     }
})

profileRouter.patch('/profile/forgotpassword',userAuth,async(req,res)=>{
     try {
        const {oldPassword,newPassword}=req.body
        const user=req.user
        const isPasswordValid=await user.validatePasswordHash(oldPassword)
        if(!isPasswordValid) {
            throw new Error("Entered old password doesnt match")
        }
  
        const newPasswordToDb=await bcrypt.hash(newPassword,10)
        user.password=newPasswordToDb
        console.log(user)
        await user.save()
        res.send('Password changed successfully')

     } catch (err) {
        res.status(400).send(err.message)
     }
})
module.exports=profileRouter