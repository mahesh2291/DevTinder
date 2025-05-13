const { text } = require('express')
const socket=require('socket.io')

const intializeSocket=(server)=>{
    

    const io=socket(server,{
        cors: {
            origin: "http://localhost:5173"
        }
    })
    
    io.on("connection",(socket)=>{
        socket.on("joinChat",({firstName,userId,targetUserId})=>{
          const roomId=[userId,targetUserId].sort().join("_")
          console.log(firstName+ " " +"Joining Room:"+roomId)
          socket.join(roomId)
        })
        socket.on("sendMessage",({firstName,userId,targetUserId,text})=>{
            const roomId=[userId,targetUserId].sort().join("_")
            console.log(firstName+ " "+ text)
            io.to(roomId).emit("messageReceived",{firstName,text})
        })
        socket.on("disconnect",()=>{
            
        })
    })
}


module.exports=intializeSocket