import express from 'express';
import dotenv from 'dotenv';
import './Models/db.js'
import AuthRouter from './Routes/AuthRouter.js';
import cors from 'cors';
import bodyParser from 'body-parser';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());



app.use('/auth',AuthRouter)

app.get('/ping',(req,res)=>{
    res.send("PONG!")
})
app.get('/',(req,res)=>{
    res.send("Hi")
})



app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
})