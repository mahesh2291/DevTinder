const express=require('express');

const app=express()

app.get('/user',(req,res)=>{
    res.send({firstName:"Uma Mahesh",lastName:"Giduthuri"})
})

app.post('/user',(req,res)=>{
    res.send("Data saved Successfully")
})

app.delete('/user',(req,res)=>{
    res.send("User Deleted successfully")
})

app.put('/user',(req,res)=>{
    res.send("put successful")
})

app.patch('/user',(req,res)=>{
    res.send("Patch successful")
})



app.listen(3000,()=>{
    console.log("Server is Running")
})