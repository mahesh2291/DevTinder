const express=require('express');
const connectDB=require("./config/database");
const cookieParser = require('cookie-parser');
const app=express()


app.use(express.json())
app.use(cookieParser())

const authRouter=require('./routes/auth')
const profileRouterRouter=require('./routes/profile')
const requestRouter=require('./routes/requests')


connectDB().then(()=>{
    console.log("DB connection successful")
    app.listen(3000,()=>{
    console.log("Server is Running")
})
}).catch((err)=>{
   console.log("DB connection Failed:"+ err)
})

