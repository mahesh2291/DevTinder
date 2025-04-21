const express=require('express');
const connectDB=require("./config/database");
const cookieParser = require('cookie-parser');
const authRouter=require('./routes/auth')
const profileRouter=require('./routes/profile')
const requestRouter=require('./routes/requests');
const userRouter = require('./routes/user');


const app=express()


app.use(express.json())
app.use(cookieParser())

app.use('/',authRouter)
app.use('/', profileRouter)
app.use('/', requestRouter)
app.use('/',userRouter)

connectDB().then(()=>{
    console.log("DB connection successful")
    app.listen(3000,()=>{
    console.log("Server is Running")
})
}).catch((err)=>{
   console.log("DB connection Failed:"+ err)
})

