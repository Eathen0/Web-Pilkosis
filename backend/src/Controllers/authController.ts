/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Router, Request, Response } from "express";
import UserModel from "../Models/User";
import jwt from 'jsonwebtoken'
import TokenModel from "../Models/TokenModel";
import dotenv from 'dotenv'

dotenv.config()

const router: Router = express.Router()
const user = new UserModel()
const expire = 1000 * 60 * 60 * 24 * 30

const generateRefreshToken = (payload: object) => {
    const tokenmodel = new TokenModel()
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: `${expire}ms`,
        algorithm: "HS384"
    })
    tokenmodel.insert({ token: token })
    return token
}

router.get("/login", async (req: Request, res: Response) => {
    const username = req.query.username;
    const paswd = req.query.password;

    try {
        const result: Array<object> = await user.Find({ username: username, paswd: paswd })
        if (result.length > 0) {
            res.cookie("rfrsh", generateRefreshToken({
                username: username,
            }), { httpOnly: true, maxAge: expire })
            res.json({
                message: "berhasil",
            })
        } else {
            res.status(404).json({
                message: "gagal"
            })
        }
    } catch (err) {
        console.log(err);
    }
})
router.post('/logout', async (req: Request, res: Response) => {
    const tokenmodel = new TokenModel()
    const token = req.cookies.rfrsh

    if (!token) return res.status(401).json({ message: "Token tidak valid" })
    tokenmodel.Find({ token: token }).then((result) => {
        if (result.length > 0) {
            res.clearCookie('rfrsh')
            res.json({
                message: "Berhasil logout"
            })
        } else {
            res.status(401).json({
                message: "Token tidak valid"
            })
        }
    })
})


export default router;