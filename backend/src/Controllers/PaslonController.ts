// /* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request, Response, } from "express";
import AdminMiddleware from '../Middleware/AdminMiddleware'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import UploadMiddleware from "../Middleware/UploadMiddleware";
import fs from 'fs'
import uploadFile from "../utils/upload";
import PaslonModel from "../Models/PaslonModel";
import AuthorizationMiddleware from "../Middleware/AuthorizationMiddleware";

const router = express.Router()
router.use(cookieParser())

const paslon = new PaslonModel()

router.get("/paslon", AuthorizationMiddleware, async (req: Request, res: Response) => {
    const result = await paslon.All();

    res.status(200).json({
        message: "success",
        data: result
    })
})

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
                const data = await paslon.insert({ nomor_urut, nama, caksis, cawaksis, visi, misi, img: result })
                console.log(res);

                res.status(200).json({
                    message: "success",
                    data: data
                })

            } catch (err) {
                console.log(err);

                res.status(400).json({ message: "sd" })
            }
        } catch {
            res.status(400).json({
                message: "Only image files are allowed!"
            })
        }
    })
})
router.delete("/paslon", AdminMiddleware, (req, res) => {

    const idPaslon = Number(req.query.idPaslon);
    try {

        console.log(idPaslon);

        const result = paslon.dropById(idPaslon)

        res.status(200).json({
            message: "success",
            data: result
        })
    } catch {
        res.status(400).json({
            message: "failed"
        })
    }


})


export default router 