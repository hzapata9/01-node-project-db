import { User } from "../interfaces/user.interface";
import { UserModel } from "../models/user.model";
import { nanoid } from "nanoid"
import bcrypt from "bcryptjs"

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

    const newUser = await UserModel.create(email, password);
    return newUser;
};



/*
const getAllUsers = async() => {
    const users = await UserModel.readUsers();
    return users;
};

const getUser = async() => {};

const getUserById = async(id: string) => {
    const users: User[] = await UserModel.readUsers();
    const user = users.find((element) => element.id === id);
    return user;
};

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
    const users = await UserModel.readUsers();
    users.push(newUser);
    return await UserModel.writeUsers(users);
};

const deleteUser = async(id: string) => {
    const user = await getUserById(id);
    if(!user) {
        throw new Error("User not found! \n");
    }
    const users: User[] = await UserModel.readUsers();
    const filteredUsers = users.filter((user) => user.id != id);
    return await UserModel.writeUsers(filteredUsers);
};

const updateUser = async(id: string, email: string, password: string) => {
    const user = await getUserById(id);
    if(!user) {
        throw new Error("User not found! \n");
    }
    const users: User[] = await UserModel.readUsers();
    console.log("BEFORE map");
    const updatedUsers = users.map((user) => {
        if(user.id === id) {
            return {
                ...user,
                email,
                password,
            };
        }
        return user;
    });
    console.log("BEFORE writeUsers");
    return await UserModel.writeUsers(updatedUsers);
};

*/
export const userService = {
    /*getAllUsers,
    getUser,
    getUserById,
    
    createUser,
    deleteUser,
    updateUser,
    */
    createUserWithEmailAndPassword,
    getUserByEmail,
}