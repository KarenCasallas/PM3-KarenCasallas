"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserService = exports.getUserByIdService = exports.getAllUserService = void 0;
const credentialService_1 = require("./credentialService");
const data_source_1 = require("../config/data-source");
const getAllUserService = () => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield data_source_1.userModel.find({
        relations: {
            appointments: true,
        }
    });
    return allUsers;
});
exports.getAllUserService = getAllUserService;
const getUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield data_source_1.userModel.findOne({
        where: { id },
        relations: ["appointments"],
    });
    if (!foundUser)
        throw new Error("El usuario con el ${id} no existe");
    return foundUser;
});
exports.getUserByIdService = getUserByIdService;
const registerUserService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield data_source_1.userModel.create({
        name: userData.name,
        email: userData.email,
        birthdate: userData.birthdate,
        nDni: userData.nDni,
    });
    yield data_source_1.userModel.save(newUser);
    const newCredentials = yield (0, credentialService_1.createCredentialsService)({
        userName: userData.userName,
        password: userData.password,
    });
    newUser.credentials = newCredentials;
    const results = yield data_source_1.userModel.save(newUser);
    return results;
});
exports.registerUserService = registerUserService;
