import RoomModel from "../Models/Room.model.js";
import UserModel from "../Models/User.model.js";
import { customAlphabet } from "nanoid";
import { io } from "../server.js";

/**
Finish getRooms (merge DB and socket status if needed)
Implement joinRoom
Implement leaveRoom
Implement deleteRoom
Implement getRoomById
 */

export const createRoom = async (req, res) => {

    const { name, capacity } = req.body;
    const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 5)
    const roomId = nanoid();
    try {

        if (!name || !capacity) {
            return res.status(400).json({
                message: "Room name and capacity are required",
                success: false,
            });
        }

        const user = await UserModel.findById(req.id);
        const owner = user._id;


        const existingRoomName = await RoomModel.findOne({ owner, name });

        if (existingRoomName) {
            return res.status(400).json({
                message: `Room ${name} already exists`,
                success: false
            })
        }

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized",
                succes: false
            })
        }

        const newRoom = await new RoomModel({ name, capacity, owner, roomId })
        await newRoom.save();

        return res.status(201).json({
            message: "Room created",
            success: true,
            room: newRoom,
        })

    } catch (err) {
        console.error("Error in creating Room : ", err);
        return res.status(500).json({
            message: "Internal server error",
            succes: false
        })
    }
}

export const getRooms = async (req, res) => {

    try {
        if (!io) return res.status(500).json({ error: "Socket.io not initialized" })

        const rooms = io.sockets.adapter.rooms;
        const sids = io.sockets.adapter.sids;

        const roomStatuses = [];
        for (let [roomId, sockets] of rooms) {
            if (!sids.has(roomId)) { 
                roomStatuses.push({
                    roomId,
                    status: sockets.size > 0 ? "online" : "offline",
                    members: Array.from(sockets)
                });
            }
        }

        const availableRooms = await RoomModel.find({});
        console.log(rooms);
        console.log(sids);        

        return res.status(200).json({

            message: "Available rooms listed",
            succes: true,
            availableRooms,
            roomStatuses

        })


    } catch (err) {
        console.error("Error in listing Rooms : ", err);
        return res.status(500).json({
            message: "Internal server error",
            succes: false
        })
    }

}

export const joinRoom = async (req, res) => {

    try {



    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }

}