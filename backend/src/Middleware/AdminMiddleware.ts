import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserModel from '../Models/User';

dotenv.config();

async function AuthorizationMiddleware(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
        return res.status(401).json({ message: "UNAUTHORIZED" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY as string, { algorithms: ["HS256"] });
        const nis = (decoded as any)["nis"];
    
        const user = new UserModel();
        const userDetail = await user.Find({ nis });
        
        
        if (userDetail.length > 0 && userDetail[0].role_user === "admin") {
            next();
        } else {
            return res.status(401).json({ message: "UNAUTHORIZED" });
        }
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).json({ message: "UNAUTHORIZED" });
    }
}

export default AuthorizationMiddleware;
