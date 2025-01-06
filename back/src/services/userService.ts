import IUser from "../interfaces/IUser"
import UserDto from "../dto/UserDto";
import { createCredentialsService } from "./credentialService";
import { userModel } from "../config/data-source";
import { User } from "../entities/User";
import { promises } from "dns";

export const getAllUserService = async(): Promise<User[]> => {
    const allUsers = await userModel.find({
        relations:{
            appointments:true,
        }
    });
    return allUsers;
};

export const getUserByIdService = async(id: number): Promise<User> => {
    const foundUser: User | null = await userModel.findOne({
        where: {id},
        relations: ["appointments"],
    });
    if(!foundUser) throw new Error("El usuario con el ${id} no existe");
    return foundUser;
};

export const registerUserService = async(userData: UserDto): Promise<User> => {
    const newUser = await userModel.create({

        name: userData.name,
        email: userData.email,
        birthdate: userData.birthdate,
        nDni: userData.nDni,

    });

    await userModel.save(newUser);
   
    const newCredentials = await createCredentialsService({
        userName: userData.userName,
        password: userData.password,
    });

    newUser.credentials = newCredentials;

    const results = await userModel.save(newUser);
    
    return results;
   
};
 