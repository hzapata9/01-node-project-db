import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { verifyAccessToken } from "../utils/auth.utill";

export const verifyToken = async(req: Request, res: Response, next: NextFunction) => {
    console.log("Paso por aqui");
    
    const authHeader = req.headers.authorization;
    if(!authHeader) {
        res.status(401).json("NO Bearer Header!");
        return;
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = verifyAccessToken(token);
        
        console.log(payload);
    } catch(error) {
        console.log(error);
        res.status(401).json( { error: "token invalid" });
    }

    next();
}