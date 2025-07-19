import express from 'express';
import dotenv from 'dotenv';
import './Database/db.js'
import cors from 'cors';
import bodyParser from 'body-parser';
import {createServer} from "node:http";
import { connectToSocket } from './Controllers/SocketManager.js';
import router from "./Routes/index.js"
import envConfig from './Config/envConfig.js';
 
dotenv.config();

const app = express();
const PORT = envConfig.PORT;
const server = createServer(app);
const io = connectToSocket(server,{
    cors:{
        methods:["POST","GET"],
        origin:["http://localhost:5173"]

    }
});

app.use(bodyParser.json());
app.use(cors());
app.use(express.json({limit: '40kb'}));
app.use(express.json({limit: '40kb', extended: true}));

app.use("/api/v1", router);


app.get('/',(req,res)=>{
    res.send("Hi")
})

server.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
})