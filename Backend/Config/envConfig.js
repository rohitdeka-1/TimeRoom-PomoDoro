import dotenv from "dotenv";
dotenv.config();

const envConfig = {
    PORT: process.env.PORT || 8020,
    MONGO_URI: process.env.MONGO_URI,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN, 
}

export default envConfig;