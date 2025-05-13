const express=require('express');
const cors=require('cors')
const connectDB=require("./config/database");
const cookieParser = require('cookie-parser');
const authRouter=require('./routes/auth')
const profileRouter=require('./routes/profile')
const requestRouter=require('./routes/requests');
const userRouter = require('./routes/user');
require('dotenv').config()


const app=express()


app.use(cors({
    origin: "https://devtindermatchmaking.netlify.app",
    credentials:true //"http://localhost:5173"
}))
app.use(express.json())
app.use(cookieParser())


app.use('/',authRouter)
app.use('/', profileRouter)
app.use('/', requestRouter)
app.use('/',userRouter)

connectDB().then(()=>{
    console.log("DB connection successful")
    app.listen(process.env.PORT,()=>{
    console.log("Server is Running")
})
}).catch((err)=>{
   console.log("DB connection Failed:"+ err)
})

