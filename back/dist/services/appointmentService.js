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
exports.cancelAppointmentService = exports.scheduleAppointmentService = exports.getAppointmentByIdService = exports.getAllAppointmentsService = void 0;
const Appointment_1 = require("../entities/Appointment");
const data_source_1 = require("../config/data-source");
const userService_1 = require("./userService");
const getAllAppointmentsService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        relations: {
            user: true,
        },
    };
    if (userId) {
        options.where = {
            user: {
                id: userId,
            },
        };
    }
    ;
    const allAppointments = yield data_source_1.appointmentModel.find(options);
    return allAppointments;
});
exports.getAllAppointmentsService = getAllAppointmentsService;
const getAppointmentByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const foundAppointment = yield data_source_1.appointmentModel.findOne({
        where: { id },
        relations: ["user"],
    });
    if (!foundAppointment)
        throw new Error("El turno con el ${id} no existe");
    return foundAppointment;
});
exports.getAppointmentByIdService = getAppointmentByIdService;
const scheduleAppointmentService = (createAppointment) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, userService_1.getUserByIdService)(createAppointment.user);
    const newAppointment = yield data_source_1.appointmentModel.create({
        date: createAppointment.date,
        time: createAppointment.time,
        user: user,
        status: Appointment_1.AppointmentStatus.ACTIVE,
    });
    const results = yield data_source_1.appointmentModel.save(newAppointment);
    return results;
});
exports.scheduleAppointmentService = scheduleAppointmentService;
const cancelAppointmentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointment = yield (0, exports.getAppointmentByIdService)(id);
    if (appointment.status == "cancelled")
        throw new Error("El turno ya esta cancelado");
    appointment.status = Appointment_1.AppointmentStatus.CANCELLED;
    const results = yield data_source_1.appointmentModel.save(appointment);
    return results.id;
});
exports.cancelAppointmentService = cancelAppointmentService;
