import UserModel from "../Models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import envConfig from "../Config/envConfig.js";
import { sendMail } from "../services/Mailer.js";
import crypto from "node:crypto";
import getIpAddress from "../services/GetIp.js";

export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await UserModel.findOne({ $or: [{ email }, { username }] });
        if (user) {
            return res.status(409).json({ message: "user already exists" });
        }
        const userModel = new UserModel({ username, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();

        sendMail(userModel.email, "Welcome to TIMEROOM", "Welcome", {
            username: userModel.username,
        });

        res.status(201).json({
            message: "Signup Success",
            success: true,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};

export const login = async (req, res) => {
    try {
        const { identity, password } = req.body;
        const user = await UserModel.findOne({
            $or: [{ email: identity }, { username: identity }],
        });

        if (!user) {
            res.status(404).json({
                message: "User doesn't exists",
                success: false,
            });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({
                message: "Incorrect Credentials",
                success: false,
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
            },
            envConfig.ACCESS_TOKEN,
            { expiresIn: "1d" }
        );

        const ipAddress = getIpAddress();

        sendMail(user.email, "Login Detected TIMEROOM", "Login", {
            username: user.username,
            ipAddress: ipAddress,
            loginTime: new Date().toLocaleString(),
            deviceInfo: req.headers["user-agent"] || "Unknown device",
        });

        res.status(200).json({
            message: "Login Success",
            success: true,
            token,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

export const forgotPassword = async (req, res) => {
    const { identity } = req.body;
    try {
        const user = await UserModel.findOne({
            $or: [{ email: identity }, { username: identity }],
        });
 
        if (!user) {
            return res.status(404).json({
                message: "User doesn't exists",
                success: false,
            });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpiry = Date.now() + 1000 * 60 * 12;
        await user.save();

        const resetLink = `${envConfig.FRONTEND}/reset-password/${resetToken}`;

        sendMail(
            user.email,
            "Password Reset Request - TimeRoom",
            "PasswordReset",
            {
                username: user.username,
                requestTime: new Date().toLocaleString(),
                ipAddress: req.ip || req.headers["x-forwarded-for"] || "Unknown IP",
                deviceInfo: req.headers["user-agent"] || "Unknown device",
                resetLink: resetLink,  
                year: new Date().getFullYear()
            }
        );

        return res.status(200).json({
            message: "Password reset successfully",
            success: true,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword, confirmNewPassword } = req.body;
    try {

        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
        const user = await UserModel.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpiry: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(404).json({
                message: "Reset link expired or not sent",
                success: false,
            });
        }


        if (newPassword != confirmNewPassword) {
            return res.status(401).json({
                message: "Passwords don't match",
                success: false,
            });
        }
        const newHashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = newHashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiry = undefined;
        await user.save();

        sendMail(
            user.email,
            "Password Changed - TimeRoom",
            "PasswordChanged",
            {
                username: user.username,
                deviceInfo: req.headers["user-agent"] || "Unknown device",
                ipAddress: req.ip || req.headers["x-forwarded-for"] || "Unknown IP",
                changeTime: new Date().toLocaleString(),
                year: new Date().getFullYear()
            }
        );

        res.status(200).json({
            message: "Password reset successful",
            success: true,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};
