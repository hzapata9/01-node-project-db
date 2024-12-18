import { it } from "node:test";
import { userService } from "./user.service";
import { User } from "../interfaces/user.interface";
import bcrypt from "bcryptjs"
import { generateAccessToken } from "../utils/auth.utill";
import { HttpError } from "../utils/httpError.util";

const getAllUsers = async() => {
    return userService.getAllUsers();
}

const loginWithEmailAndPassword = async(email: string, password: string) => {
    // 1. verificar que existe el usuario
    const user = await userService.getUserByEmail(email);
    if(!user) {
        throw new HttpError("User not found! \n", 400);
    }

    // 2. comparar los hash de password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if(!isValidPassword) {
        throw new HttpError("Password incorrect! \n", 500);
    }

    // 3. generar el token
    const token = generateAccessToken(user.email, user.id);
    return token;
};

const registerWithEmailAndPassword = async(email: string, password: string) => {

    // 1.verificar si el email existe
    const newUser = await userService.createUserWithEmailAndPassword(email, password);

    const token = generateAccessToken(newUser.email, newUser.id);
    return token;
}

export const authService = {
    loginWithEmailAndPassword,
    registerWithEmailAndPassword,
    getAllUsers,
}