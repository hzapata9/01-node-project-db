import { User } from "../interfaces/user.interface";
import { UserModel } from "../models/user.model";
import { nanoid } from "nanoid"
import bcrypt from "bcryptjs"
import { parseArgs } from "util";

const getUserById = async(id: string) => {
    const user: User = await UserModel.findById(id);
    if(!user) throw new Error("User not found");
    return user;
};

const getUserByEmail = async(email: string) => {
    const user = await UserModel.findOneByEmail(email);
    return user;
};

const createUserWithEmailAndPassword = async(
    email: string,
    password: string
) => {
    const user = await UserModel.findOneByEmail(email);
    if (user) {
        throw new Error("Email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(password, salt);

    const newUser = await UserModel.create(email, passwordHashed);
    return newUser;
};

const getAllUsers = async() => {
    const users = await UserModel.findAll();
    return users;
};
/*
const createUser = async(email: string, password: string) => {
    const user = await getUserByEmail(email);
    if(user) {
        throw new Error("User already exists! \n");
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(password, salt);

    const newUser = {
        id: nanoid(),
        email,
        password: passwordHashed,
    };
    const users = await UserModel.findAll();
    users.push(newUser);
    return await UserModel.writeUsers(users);
};
*/
const deleteUserById = async(id: string) => {
    const user = await getUserById(id);
    if(!user) {
        throw new Error("User not found! \n");
    }
    const users = await UserModel.remove(id);
    if(!user) throw new Error("User Not Found.");
    return users;
};

const updateUserById = async(id: string, email: string, password: string) => {
    const user = await UserModel.update(id, email, password);
    if(!user) throw new Error("User not found! \n");
    return user;
};


export const userService = {
    getAllUsers,
    getUserById,
    getUserByEmail,
    deleteUserById,
    updateUserById,
    createUserWithEmailAndPassword,
}