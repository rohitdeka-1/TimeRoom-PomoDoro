import express from 'express';
import { createRoom, getRooms } from "../Controllers/Room.controller.js";
import { verifyJWT } from '../Middlewares/VerifyToken.js';
/**
 * @description- This Route is for Room
 * @todo- Need to Implement this routes
    GET /rooms (list all rooms with status)
    POST /rooms/create
    GET /rooms/:id (room details)
    POST /rooms/:id/join (join room via code)
    DELETE /rooms/:id/leave
*/

const roomRoute = express.Router();

roomRoute.post("/create",verifyJWT,createRoom)
roomRoute.get("/all-rooms",getRooms)
export default roomRoute;
