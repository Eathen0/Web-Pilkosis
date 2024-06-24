/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Router, Request, Response } from "express";
import UserModel from "../Models/User";
import jwt from 'jsonwebtoken'
import TokenModel from "../Models/TokenModel";
import dotenv from 'dotenv'
import TokenMiddleware from "../Middleware/tokenMiddleware";
import cookieParser from 'cookie-parser'


dotenv.config()

const router = express.Router()
router.use(cookieParser())

router.post("/vote", TokenMiddleware, (req: Request, res: Response) => {

    const bearrerToken = req.headers.authorization.split(" ")[1]
    try {

        const verifyToken = jwt.verify(bearrerToken, process.env.SECRET_KEY)
        console.log(verifyToken);

        res.json({
            message: "Oke"
        })
    } catch {
        res.status(401).json({
            message: "UNAUTHORIZED"
        })
    }
})


export default router