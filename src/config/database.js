const mongoose=require('mongoose')

const connectDB=async ()=>{
     await mongoose.connect("mongodb+srv://mahesh2291:Kiran2291@namastenode.kjygiqp.mongodb.net/DevTinder")
}


module.exports=connectDB