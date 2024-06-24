import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function AuthorizationMiddleware(req: Request, res: Response, next: NextFunction): void {
    // console.log(req.headers);

    const token = (req.headers.authorization).split(" ")[1];
    if (!token) res.status(401).json({ message: "UNAUTHORIZED" });
    // console.log(token);

    try {
        jwt.verify(token, process.env.SECRET_KEY);
        // console.log(verify["username"]);
        next()
    } catch {
        res.status(401).json({ message: "UNAUTHORIZED" });
    }

}

export default AuthorizationMiddleware;