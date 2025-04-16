const express=require('express');
const connectDB=require("./config/database");
const User = require('./models/user');
const app=express()

app.use(express.json())

// signup API
app.post('/signup',async (req,res)=>{
     const user=new User(req.body)
        try{
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

app.patch('/user', async(req,res)=>{
    const updatedData=req.body
    const id=req.body.id

    try {
        const user=await User.findByIdAndUpdate(id,updatedData,{runValidators:true})
        res.send("User updated successfully")
    } catch (err) {
        res.status(400).send("something went wrong"+err)
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

