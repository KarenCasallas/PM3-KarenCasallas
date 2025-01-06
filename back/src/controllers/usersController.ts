import { Request, Response } from "express";
import IUser from "../interfaces/IUser";
import { getAllUserService, getUserByIdService, registerUserService } from "../services/userService";
import UserDto from "../dto/UserDto";
import ICredential from "../interfaces/ICredential";
import CredentialDto from "../dto/CredentialDto";
import {validateCredentialsService} from "../services/credentialService";
import { User } from "../entities/User";

export const getAllUsers = async(_req: Request,res: Response) => {
    try{
        const users: User[] = await getAllUserService();
        res.status(200).json(users);
    } catch (error: any){
        res.status(400).json({
            message: error.message,
        });
    }    
};

export const getUserById = async(req: Request,res: Response) => {
    try{
        const { id } = req.params;    
        const user: User | null = await getUserByIdService(Number(id));
        res.status(200).json(user);
    } catch (error: any){
        if (error.message == "El usuario con el ${id} no existe") {
            res.status(404).json({ message: error.message});
        }
        res.status(500).json({ message: error.message});
    };
} 

 export const registerUser = async (req: Request, res: Response) => { 
    try{
        const {name, email, birthdate, userName, password, nDni} : UserDto = req.body;
        const user: User = await registerUserService({
            name, 
            email, 
            birthdate,
            userName, 
            password, 
            nDni
        });
        res.status(201).json(user);
    } catch (error: any){
        res.status(400).json({
            message: error.message,
        });
    } 
};

export const loginUser = async(req: Request,res: Response) => { 
    try{
        const {userName, password} : CredentialDto = req.body;
        const credentialId: number = await validateCredentialsService({userName, password});
        const user: User = await getUserByIdService (credentialId);
        res.status(200).json({login: true, user});
    } catch (error: any){
        res.status(400).json({ message: error.message});
    }
};
