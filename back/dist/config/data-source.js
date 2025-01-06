"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentModel = exports.credentialModel = exports.userModel = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const envs_1 = require("./envs");
const Appointment_1 = require("../entities/Appointment");
const Credential_1 = require("../entities/Credential");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: envs_1.DB_HOST || "localhost",
    port: envs_1.DB_PORT || 5432,
    username: envs_1.DB_USERNAME || "test",
    password: envs_1.DB_PASSWORD || "test",
    database: envs_1.DB_NAME || "test",
    //dropSchema:true,
    synchronize: true,
    logging: false,
    entities: [User_1.User, Appointment_1.Appointment, Credential_1.Credential],
    subscribers: [],
    migrations: [],
});
exports.userModel = exports.AppDataSource.getRepository(User_1.User);
exports.credentialModel = exports.AppDataSource.getRepository(Credential_1.Credential);
exports.appointmentModel = exports.AppDataSource.getRepository(Appointment_1.Appointment);
