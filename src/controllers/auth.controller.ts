import { log } from "console";
import { Request, Response, NextFunction } from "express";
import { userService } from "../services/user.service";
import { authService } from "../services/auth.service";
import { nextTick } from "process";

const login = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const token = await authService.loginWithEmailAndPassword(email, password);
        console.log("TOKEN: " , token);
        //res.json({});
        res.status(200).json({ token });
    } catch(error) {
        next(error);
    }
};

const register = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const token = await authService.registerWithEmailAndPassword(email, password);
        res.status(201).json(token);
    } catch(error) {
        next(error);
    }
};

export const authController = {
    login,
    register,
};