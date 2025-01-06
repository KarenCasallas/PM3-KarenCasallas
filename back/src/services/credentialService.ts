import { AppDataSource, credentialModel } from "../config/data-source";
import CredentialDto from "../dto/CredentialDto";
import { Credential } from "../entities/Credential";

export const createCredentialsService = async(credentialData: CredentialDto): Promise<Credential> => { 
    const newCredentials = await credentialModel.create({
        userName: credentialData.userName,
        password: credentialData.password,
    });

    const results: Credential = await credentialModel.save(newCredentials);

    return results;
};
 
export const validateCredentialsService = async(credentialData: CredentialDto): Promise<number> => { 
    const foundCredentials: Credential | null = await credentialModel.findOneBy({
        userName: credentialData.userName,
    });

    if(!foundCredentials) throw new Error("Usuario no registrado");
    if(foundCredentials.password != credentialData.password) throw new Error("Contraseña incorrecta");

    return foundCredentials.id;
}
