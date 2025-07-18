import express from 'express';
import signup from '../Controllers/AuthController.js'; 
import { signupValidation } from '../Middlewares/AuthValidation.js';
import { loginValidation } from '../Middlewares/AuthValidation.js';

const router = express.Router(); 


router.post('/login',loginValidation,login);

router.post('/signup',signupValidation, signup);


export default router;

