const express=require('express');
const connectDB=require("./config/database");
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const User = require('./models/user');
const { validateSignup } = require('./utils/validateSignup');
const cookieParser = require('cookie-parser');
const app=express()

app.use(express.json())
app.use(cookieParser())

// signup API
app.post('/signup',async (req,res)=>{
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

// single user API
app.get('/user',async (req,res)=>{
    const userEmailId=req.body.email
    try{
         const user=await User.find({email:userEmailId}) 
         if(user.length===0) {
           res.status(404).send("User not found")
         } else {
            res.send(user)
         }
    }
    catch (err) {
      res.status(400).send(`something went wrong ${err}`)
    }
})

// List of users API
app.get('/feed',async (req,res)=>{
   
    try{
         const user=await User.find({}) 
         res.send(user)
    }
    catch (err) {
      res.status(400).send(`something went wrong ${err}`)
    }
})

//Deleting user
app.delete('/user', async (req,res)=>{
    const id=req.body.id

    try {
        const user= await User.findByIdAndDelete(id)
        res.send("user Deleted")
    } catch (err) {
        res.status(400).send(" something went wrong")
    }

})

app.patch('/user/:id', async(req,res)=>{
    const updatedData=req.body
    const id=req.params.id
    
    try {

    const ALLOWED_UPDATES=["photoUrl","about","gender","age","skills"];
    const isUpdatedAllowed=Object.keys(updatedData).every(k=>ALLOWED_UPDATES.includes(k))
    if(!isUpdatedAllowed) {
        throw new Error("Update not allowed");
    }

    if(updatedData?.skills?.length>10) {
        throw new Error("SKills cannot be more than 10")
    }

        const user=await User.findByIdAndUpdate(id,updatedData,{runValidators:true})
        res.send("User updated successfully")
    } catch (err) {
        res.status(400).send("something went wrong"+err)
    }
})

app.post('/login',async(req,res)=>{
    const {email,password}=req.body

    try{
        const user=await User.findOne({email:email})
        if(!user) {
            throw new Error("Invalid credentials")
        }

        const isPasswordValid=await bcrypt.compare(password,user.password)
        

        if(!isPasswordValid) {
            throw new Error("Invalid credentials")
        } else {
            //JWT 
           const token= await jwt.sign({_id:user._id},'Mahesh2291')
           console.log(token)
           res.cookie("token",token)
            res.send("Authentication successful")
        }

    } catch (err) {
        res.status(400).send(`${err}`)
    }
} )


app.get('/profile',async(req,res)=>{
    
    try {
    const cookie=req.cookies

    const {token}=cookie
    if(!token) {
        throw new Error("Invalid token")
    }

    const decodedMessage=await jwt.verify(token,"Mahesh2291")

    const {_id}=decodedMessage

    const user= await User.findById(_id)
    console.log(user)
    if(!user) {
        throw new Error("User doesnt exist")
    }
    res.send(user)
} catch (err) {
    res.status(400).send('Error'+ err)
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

