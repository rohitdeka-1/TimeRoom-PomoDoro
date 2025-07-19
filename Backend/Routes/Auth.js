import express from 'express';
import {login, signup} from '../Controllers/AuthController.js'; 
import { loginValidation, signupValidation } from '../Middlewares/AuthValidation.js';
 
const authRoute = express.Router();

authRoute.post('/login',loginValidation,login);
authRoute.post('/signup',signupValidation, signup);




export default authRoute;

