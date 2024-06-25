/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Router, Request, Response } from "express";
import UserModel from "../Models/User";
import jwt from 'jsonwebtoken'
import TokenModel from "../Models/TokenModel";
import dotenv from 'dotenv'
import AuthorizationMiddleware from "../Middleware/AuthorizationMiddleware";
import cookieParser from 'cookie-parser'
import PaslonModel from "../Models/PaslonModel";

const paslon = new PaslonModel()
dotenv.config()

const router = express.Router()
router.use(cookieParser())

router.post("/vote", AuthorizationMiddleware, async (req: Request, res: Response) => {
    try {
        const result = paslon.vote(Number(req.query.id))
        res.status(200).json({
            message: "Success"
        })
    } catch {
        res.status(400).json({
            message: "Internal server error"
        })
    }
})


export default router