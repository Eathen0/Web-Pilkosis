/* eslint-disable @typescript-eslint/no-unused-vars */

import express, { Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import UserModel from "../Models/User";
import cors from 'cors'
dotenv.config()
const router = express.Router()
router.use(cookieParser())

router.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
const usermodel = new UserModel()

router.get("/token", async (req: Request, res: Response) => {
    const token = req.cookies.rfrsh
    // console.log(token);

    try {
        const verify: JwtPayload | string = jwt.verify(token, process.env.SECRET_KEY, { algorithms: ["HS384"] })
        const username = verify['username']
        const user = await usermodel.Find({ username })
        const userData = user[0]

        const accessToken = jwt.sign({ username: username }, process.env.SECRET_KEY, { expiresIn: "20m", algorithm: "HS256" })
        // res.h
        res.send({
            accessToken: accessToken,
            data: {
                nama: userData.nama,
                username: userData.username,
                role: userData.role_user
            }
        })
    } catch {
        res.status(401).json({
            message: "Unauthorized"
        })
    }
})


export default router