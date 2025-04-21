const express=require('express')
const { userAuth } = require('../middlewares/auth')
const connectionRequest = require('../models/connectionRequest')


const userRouter=express.Router()


userRouter.get('/user/requests/received',userAuth,async(req,res)=>{
    try {
        const loggedInUser=req.user
        

        const requests= await connectionRequest.find({
            toUserId:loggedInUser._id,
            status:'interested'
        })
        
        if(!requests) {
            throw new Error("No requests found")
        }

       res.json({
        message:'This are user requests',
        requests
       })

    } catch (err) {
        res.status(400).send('Error'+ err)
    }
})




module.exports=userRouter