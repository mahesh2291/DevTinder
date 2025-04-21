const express=require('express')
const { userAuth } = require('../middlewares/auth')
const ConnectionRequest = require('../models/connectionRequest')
const User = require('../models/user')

const requestRouter=express.Router()

requestRouter.post('/send/request/:status/:userId',userAuth,async(req,res)=>{
      const status=req.params.status
      const toUserId=req.params.userId
      const fromUserId=req.user

    try {

        const validStatus=['ignored','interested']

        const isStatusValid=validStatus.includes(status) 

         if(!isStatusValid) {
            throw new Error('Invalid Status Sent')
        }


        const isToUserIdValid=await User.findById(toUserId)

        if(!isToUserIdValid) {
            throw new Error('User doesnt exist')
        }


        const isConnectionExist=await ConnectionRequest.findOne({
            $or : [
                {fromUserId,toUserId},
                {fromUserId :toUserId,toUserId:fromUserId}
            ]
        })

        if(isConnectionExist) {
            throw new Error('Connection already exists')
        }


     const connectionRequest= new ConnectionRequest({
         fromUserId,toUserId,status
     })

     await connectionRequest.save()

     res.send("Request sent successfully")

    } catch (err) {
        res.status(400).send('Error:' + err.message)
    }
})


module.exports=requestRouter