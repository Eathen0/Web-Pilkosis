/* eslint-disable @typescript-eslint/no-unused-vars */

import express from "express";
import bodyParser from "body-parser";
import cors from 'cors'
import cookieParser from 'cookie-parser'

// IMPORT CONTROLLERS
import login from "./Controllers/authController";
import tokenController from './Controllers/AccessTokenController'
import voteController from './Controllers/voteController'
import paslonController from './Controllers/PaslonController'

const port = process.env.PORT || 3000;
const app = express();
const router = express.Router()

app.use(bodyParser.json())
app.use(cors())
router.use(cors({
    origin: "http://localhost:5173/",
    credentials: true

}))
router.use(cookieParser())

app.get("/", (req, res) => {
    res.json({
        hello: "World",
        message: "Masukan endpoint API yang valid"
    })
})

app.use("/api", login)
app.use("/api", tokenController)
app.use("/api", voteController)
app.use("/api", paslonController)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
