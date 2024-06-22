/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Router } from "express";

const router: Router = express.Router()


router.get("/login", (req, res) => {
    res.send("dfsdfd")
})


export default router;