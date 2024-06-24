/* eslint-disable @typescript-eslint/no-unused-vars */

import express, { Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()

const router = express.Router()
router.use(cookieParser())

router.get("/token", (req: Request, res: Response) => {
    const token = req.cookies.rfrsh
    try {
        const verify: JwtPayload | string = jwt.verify(token, process.env.SECRET_KEY)
        const username = verify['username']
        const accessToken = jwt.sign({ username: username }, process.env.SECRET_KEY, { expiresIn: "30s" })
        res.send({
            accessToken: accessToken
        })
    } catch {
        res.status(401).json({
            message: "Unauthorized"
        })
    }

})


export default router