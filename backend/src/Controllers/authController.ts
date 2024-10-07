/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Router, Request, Response } from "express";
import UserModel from "../Models/User";
import jwt from 'jsonwebtoken';
import TokenModel from "../Models/TokenModel";
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const router: Router = express.Router();
const user = new UserModel();
const tokenModel = new TokenModel();
const expire = 1000 * 60 * 60 * 24 * 30;

interface Payload {
    nis: string;
    id: number;
    role_user: string;
}

const generateRefreshToken = (payload: Payload): string => {
    const token = jwt.sign(payload, process.env.SECRET_KEY as string, {
        expiresIn: `${expire}ms`,
        algorithm: "HS256"
    });
    tokenModel.insert({ token });
    return token;
};

router.post("/login", async (req, res) => {

    const { username, password } = req.body;
    if (typeof username !== 'string' || typeof password !== 'string') {
        return res.status(400).json({ message: "Invalid request" });
    }
    try {
        const result = await user.Find({ nis: username, paswd: password });
        if (result.length > 0) {
            const userId = result[0].id;
            const roleUser = result[0].role_user;
            const refreshToken = generateRefreshToken({ nis: username, id: userId, role_user: roleUser });
            res.cookie("rfrsh", refreshToken, {
                httpOnly: true,
                maxAge: expire,
                sameSite: 'none', 
                secure: true      
            });

            res.json({ message: "Login berhasil" });
        } else {
            res.status(404).json({ message: "Username atau password salah" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});


router.post('/logout', async (req: Request, res: Response) => {
    const token = req.cookies.rfrsh;

    if (!token) {
        return res.status(401).json({ message: "Token tidak valid" });
    }

    try {
        const result = await tokenModel.Find({ token });

        if (result.length > 0) {
            await tokenModel.drop({ token });
            res.clearCookie('rfrsh', {
                httpOnly: true,
                sameSite: 'none', // Harus sama dengan pengaturan saat membuat cookie
                secure: true // Harus sama dengan pengaturan saat membuat cookie
            });
            res.json({ message: "Logout berhasil" });
        } else {
            res.status(401).json({ message: "Token tidak valid" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
