const mongoose=require('mongoose')


const connectionRequestSchema= new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    status:{
        type:String,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:"${VALUE} is incorrect"
        }
    }
},{
    timestamps:true
})


connectionRequestSchema.index({fromUserId: 1,toUserId:1})


connectionRequestSchema.pre('save',function (next) {
    const connectionRequest=this

    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error('You cannot send connection request to yourself')
    }
    next()
})


module.exports=mongoose.model('ConnectionRequest',connectionRequestSchema)