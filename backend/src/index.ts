/* eslint-disable @typescript-eslint/no-unused-vars */
import express from "express";
import bodyParser from "body-parser";
import cors from 'cors'
import cookieParser from 'cookie-parser'

// IMPORT CONTROLLERS
import login from "./Controllers/auth";

const port = process.env.PORT || 3000;
const app = express();
const router = express.Router()

app.use(router)
app.use(bodyParser.json())
app.use(cors())
router.use(cookieParser())
// router.use(cook)

router.get("/", (req, res) => {
    res.json({
        hello: "World",
        message: "Masukan endpoint API yang valid"
    })
})

// use controllers
app.use(login)



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})