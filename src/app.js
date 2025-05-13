const express=require('express');
const cors=require('cors')
const connectDB=require("./config/database");
const cookieParser = require('cookie-parser');
const authRouter=require('./routes/auth')
const profileRouter=require('./routes/profile')
const requestRouter=require('./routes/requests');
const userRouter = require('./routes/user');
const http=require('http');
const intializeSocket = require('./utils/socket');
require('dotenv').config()


const app=express()


app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())

const server=http.createServer(app)

intializeSocket(server)

app.use('/',authRouter)
app.use('/', profileRouter)
app.use('/', requestRouter)
app.use('/',userRouter)

connectDB().then(()=>{
    console.log("DB connection successful")
    server.listen(process.env.PORT,()=>{
    console.log("Server is Running")
})
}).catch((err)=>{
   console.log("DB connection Failed:"+ err)
})

