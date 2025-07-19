import UserModel from '../Models/User.model.js'
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import envConfig from '../Config/envConfig.js';
import {sendMail} from '../services/Mailer.js';
import os from "os";

export const signup = async(req,res)=>{
    try{
        const {username,email,password} =req.body;
        const user = await UserModel.findOne({$or:[{email},{username}]});
        if(user){
            return res.status(409)
            .json({message: "user already exists"})
        }
        const userModel = new UserModel({username,email,password});
        userModel.password = await bcrypt.hash(password,10);
        await userModel.save();

        sendMail(userModel.email, "Welcome to TIMEROOM", 'Welcome', { username: userModel.username })

        res.status(201).json({
            message:"Signup Success",
            success: true
        })
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            message:"Internal Server Error",
            success: false
        })
    }
}


export const login = async(req,res)=>{

    try{
        const {identity,password} = req.body;
        const user =  await UserModel.findOne({$or:[{email:identity},{username:identity}]});
        
        if(!user){
            res.status(404).json({
                message: "User doesn't exists",
                success: false
            })
        }
        
        const match = await bcrypt.compare(password,user.password);
        if(!match){
            return res.status(401).json({
                message: "Incorrect Credentials",
                success: false
            })
        }
        
        const token = jwt.sign({
            userId: user._id,
            
        },envConfig.ACCESS_TOKEN,{expiresIn:'1d'})

        const ip = os.networkInterfaces();
        const ipAddress = ip["Wi-Fi"][2].address;

        sendMail(user.email, "Login Detected TIMEROOM", 'Login', { 
            username: user.username,
            ipAddress: ipAddress,
            loginTime: new Date().toLocaleString(),
            deviceInfo: req.headers['user-agent'] || 'Unknown device'
        })
        
        res.status(200).json({
            message:"Login Success",
            success: true,
            token
        })
    }

    catch(err){
        console.error(err);
        return res.status(500).json({
            message:"Internal server error",
            success: false
        })
    }
};

export const forgotPassword = async(req,res) => {

    const {newPassword, confirmNewPassword} = req.body;

}