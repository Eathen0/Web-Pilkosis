import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserModel from '../Models/User';

dotenv.config();

async function AuthorizationMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {

    const token = req.headers.authorization.split(" ")[1]
    if (!token) res.status(401).json({ message: "UNAUTHORIZED" });

    try {
        const verify = jwt.verify(token, process.env.SECRET_KEY, { algorithms: ["HS256"] });
        const username = verify["username"]
        const user = new UserModel();
        const userDetail = await user.Find({ username: username });

        if (userDetail[0].role_user == "admin") {
            next()
        } else {
            res.status(401).json({ message: "UNAUTHORIZED" });
        }
    } catch {
        res.status(401).json({ message: "UNAUTHORIZED" });
    }
}

export default AuthorizationMiddleware;