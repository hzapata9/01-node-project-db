import { log } from "console";
import { Request, Response, NextFunction } from "express";
import { userService } from "../services/user.service";
import { authService } from "../services/auth.service";
import { nextTick } from "process";
import { authLoginSchema } from "../schemas/auth.schemas";
import { HttpError } from "../utils/httpError.util";

const login = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        // usando Joi para validar datos
        /*
        const { error, value } = authLoginSchema.validate(req.body);
        if(error) {
            throw new HttpError(error.message, 400);
        }
        const { email, password } = value;
        */

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