import {Server } from "socket.io";
/**
 * @description- These Events are for Chats
 * @todo- Need to Implement these Events
    POST /chat/:roomId/message
    GET /chat/:roomId/messages
*/

export const connectToSocket = (server) => {
    const io = new Server(server);

    io.on("connection",(socket)=>{  
        
        console.log(socket.id);

        socket.on("join-room",(roomId)=> {
            socket.join(roomId)  
            
        })

        socket.on("leave-room",(roomId)=>{
            socket.leave(roomId)
        })
        
    })

    return io;
}