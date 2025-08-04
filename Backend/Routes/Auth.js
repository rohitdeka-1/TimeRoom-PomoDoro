import express from 'express';
import {forgotPassword, login, resetPassword, signup} from '../Controllers/AuthController.js'; 
import { loginValidation, signupValidation } from '../Middlewares/AuthValidation.js';
 
const authRoute = express.Router();

authRoute.post('/login',loginValidation,login);
authRoute.post('/signup',signupValidation, signup);
authRoute.post('/forgot-password',forgotPassword);
authRoute.post('/reset-password/:token',resetPassword)

export default authRoute;

