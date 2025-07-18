import UserModel from '../Models/User.js'
import bcrypt from 'bcrypt';


export const signup = async(req,res)=>{
    try{
        const {name,email,password} =req.body;
        const user = await UserModel.findOne({email});
        if(user){
            return res.status(409)
            .json({message: "user already exists"})
        }
        const userModel = new UserModel({name,email,password});
        userModel.password = await bcrypt.hash(password,10);
        await userModel.save();
        res.status(200).json({
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

    const {user}

    console.log("Hey")
};

