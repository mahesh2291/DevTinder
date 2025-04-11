const express=require('express');

const app=express()

app.use('/',(req,res)=>{
    res.send("This is Homepage Test")
})


app.listen(3000,()=>{
    console.log("Server is Running")
})