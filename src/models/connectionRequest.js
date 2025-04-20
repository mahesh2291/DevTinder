const mongoose=require('mongoose')


const connectionRequestSchema= new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        require:true
    },
    status:{
        type:String,
        enum:{
            values:["ignored","interested"],
            message:"${VALUE} is incorrect"
        }
    }
},{
    timestamps:true
})


module.exports=mongoose.model('ConnectionRequest',connectionRequestSchema)