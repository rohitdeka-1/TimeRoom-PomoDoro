import { Router } from "express";
import authRoute from "./Auth.js";
import { transporter } from "../services/Mailer.js";
import path from "path";
const router = Router();

import hbs from "nodemailer-express-handlebars"
import roomRoute from "./Room.js";

//handlebars
const hbsOptions = {
    viewEngine: {
        defaultLayout: false
    },
    viewPath: path.resolve("MailTemplate")
}

transporter.use('compile',hbs(hbsOptions))




router.use("/auth",authRoute)
router.use("/room",roomRoute)



export default router



