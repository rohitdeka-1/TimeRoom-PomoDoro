import { Router } from "express";
import authRoute from "./Auth.js";
import { transporter } from "../services/Mailer.js";
import hbs from "nodemailer-express-handlebars"
import path from "path";
const router = Router();


//handlebars
const hbsOptions = {
    viewEngine: {
        defaultLayout: false
    },
    viewPath: path.resolve("MailTemplate")
}


transporter.use('compile',hbs(hbsOptions))
router.use("/auth",authRoute)

export default router