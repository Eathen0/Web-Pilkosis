/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Router, Request, Response } from "express";
import AdminMiddleware from '../Middleware/AdminMiddleware'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import UploadMiddleware from "../Middleware/UploadMiddleware";





const router = express.Router()
router.use(cookieParser())

router.post("/paslon", [AdminMiddleware, multer({ storage: UploadMiddleware }).single("img")], (req: Request, res: Response) => {
    res.json({ message: "oke" })
    console.log(req.file);


})


export default router 