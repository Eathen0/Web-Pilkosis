/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Router, Request, Response } from "express";
import UserModel from "../Models/User";
import jwt from 'jsonwebtoken'

const router: Router = express.Router()

const user = new UserModel()
router.get("/login", async (req: Request, res: Response) => {

    const username = req.query.username;
    const paswd = req.query.password;

    try {
        const result = await user.Find({ username: username, paswd: paswd })
        console.log(result);
        res.json({
            data: "ok"
        })

    } catch (err) {
        console.log(err);
    }

})


export default router;