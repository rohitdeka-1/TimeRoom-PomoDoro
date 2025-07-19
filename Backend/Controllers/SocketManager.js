import {Server } from "socket.io";
/**
 * @description- These Events are for Chats
 * @todo- Need to Implement these Events
    POST /chat/:roomId/message
    GET /chat/:roomId/messages
*/

export const connectToSocket = (server) => {
    const io = new Server(server);
    return io;
}