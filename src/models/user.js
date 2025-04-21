const mongoose=require('mongoose')
const validator=require('validator')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')


const userSchema=new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true,trim:true,validate(value){
        if(!validator.isEmail(value)) {
            throw new Error("Email adress not valid")
        }
    }},
    password:{type:String,required:true,minLength:8,validate(value){
       if(!validator.isStrongPassword(value)) {
        throw new Error("Password doesnt meet requiments")
       }
    }},
    age:{type:Number,required:true,min:18},
    gender:{type:String,validate(value){
        if(!["male","female","other"].includes(value)) {
            throw new Error("Invalid Gender")
        }
    }},
    photoUrl:{type:String,default:"https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_640.png"},
    about:{type:String},
    skills:{type:["string"]}
},{
    timestamps:true
})

userSchema.index({firstName:1,lastName:1})

userSchema.methods.getJWT=async function() {
    const user=this
   const token= jwt.sign({_id:user._id},'Mahesh2291',{expiresIn:'2d'})
   
   return token
}

userSchema.methods.validatePasswordHash=async function(password) {
    const user=this
    const isPasswordValid=bcrypt.compare(password,user.password)
    return isPasswordValid
}

module.exports=mongoose.model('User',userSchema)