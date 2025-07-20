import jwt from "jsonwebtoken";
import envConfig from "../Config/envConfig.js";


const ACCESS_TOKEN_SECRET = envConfig.ACCESS_TOKEN;

export const verifyJWT = async(req,res,next) => {


    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);

    if(!token){
        return res.status(401).json({
            success: false,
            message : "Not authenticated"
        })
    }
    
    try {
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
        req.id = decoded.userId;
        next();  
      } catch (err) {
        return res.status(403).json({
          success: false,
          message: "Invalid or expired token",
        });
      }
    
}

 