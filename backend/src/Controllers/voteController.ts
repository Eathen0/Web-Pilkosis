/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Router, Request, Response } from "express";
import UserModel from "../Models/User";
import jwt from 'jsonwebtoken'
import TokenModel from "../Models/TokenModel";
import dotenv from 'dotenv'
import AuthorizationMiddleware from "../Middleware/AuthorizationMiddleware";
import cookieParser from 'cookie-parser'


dotenv.config()

const router = express.Router()
router.use(cookieParser())

router.post("/vote", AuthorizationMiddleware, (req: Request, res: Response) => {

    res.send("ok")
})


export default router