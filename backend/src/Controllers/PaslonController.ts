/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request, Response, } from "express";
import AdminMiddleware from '../Middleware/AdminMiddleware'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import UploadMiddleware from "../Middleware/UploadMiddleware";
import fs from 'fs'
import uploadFile from "../utils/upload";
import PaslonModel from "../Models/PaslonModel";

const router = express.Router()
router.use(cookieParser())

const paslon = new PaslonModel()

router.post("/paslon", [AdminMiddleware, multer({ storage: UploadMiddleware.storage, fileFilter: UploadMiddleware.fileFilter }).single("img")], (req: Request, res: Response) => {


    const nomor_urut = req.body.nomor_urut
    const nama = req.body.nama
    const caksis = req.body.caksis
    const cawaksis = req.body.cawaksis
    const visi = req.body.visi
    const misi = req.body.misi
    const img = req.file.filename

    fs.readFile(req.file.path, async (err, data) => {
        try {
            if (err) throw err
            const result = await uploadFile(data, img)
            try {
                paslon.insert({ nomor_urut, nama, caksis, cawaksis, visi, misi, img: result })
            } catch {
                // console.log(error);

                res.status(400).json({ message: "sd" })
            }

        } catch {
            // console.log(error);

            res.status(400).json({
                message: "Only image files are allowed!"
            })
        }
    })


})


export default router 