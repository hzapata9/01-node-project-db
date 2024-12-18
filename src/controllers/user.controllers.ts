import {Request, Response} from "express";
import { userService } from "../services/user.service";
import { error } from "console";

const getUsers = async(req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch(error) {
        console.log(error);
        if (error instanceof Error) {
            res.status(500).json({ error: error.message});
        } else
            res.status(500).json({error: "Error del servidor!"});
    }
};

const getUser = async(req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch(error) {
        console.log(error);
        if (error instanceof Error) {
            res.status(500).json({ error: error.message});
        }
        res.status(500).json({error: "Error del servidor!"});
    }
};

const createUser = async(req: Request, res: Response) => {
    const {email, password} = req.body;
    try {
        await userService.createUserWithEmailAndPassword(email, password);
        res.status(201).json( {message: "User created!"} );
    } catch(error) {
        console.log(error);
        if(error instanceof Error) {
            res.status(500).json({message: error.message});
        } else {
            res.status(500).json({message: "Internal server error!"});
        }
        
    }
};

const deleteUser = async(req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await userService.deleteUserById(id);
        res.json(user);
    } catch(error) {
        console.log(error);
        if(error instanceof Error) {
            res.status(500).json({message: error.message});
        } else {
            res.status(500).json({message: "Internal server error!"});
        }
    }
};

const updateUser = async(req: Request, res: Response) => {
    const { id } = req.params;
    const { email, password } = req.body;
    try {
        const user = await userService.updateUserById(id, email, password);
        res.json(user);
    } catch(error) {
        console.log(error);
        if(error instanceof Error) {
            res.status(500).json({message: error.message});
        } else {
            res.status(500).json({message: "Internal server error!"});
        }
    }
};

export const userController = {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser,
}