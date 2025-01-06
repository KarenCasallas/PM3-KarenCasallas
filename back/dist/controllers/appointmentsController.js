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
exports.cancelAppointment = exports.scheduleAppointment = exports.getAppointmentById = exports.getAllAppointmets = void 0;
const appointmentService_1 = require("../services/appointmentService");
const getAllAppointmets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const appointments = yield (0, appointmentService_1.getAllAppointmentsService)(Number(userId));
        res.status(200).json(appointments);
    }
    catch (error) {
        if (error.message == "No hay citas agendadas") {
            res.status(400).json({ message: error.message });
            return;
        }
        res.status(500).json({ message: error.message });
    }
});
exports.getAllAppointmets = getAllAppointmets;
const getAppointmentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const appointment = yield (0, appointmentService_1.getAppointmentByIdService)(Number(id));
        res.status(200).json(appointment);
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
});
exports.getAppointmentById = getAppointmentById;
const scheduleAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date, time, user } = req.body;
        const appointment = yield (0, appointmentService_1.scheduleAppointmentService)({
            date,
            time,
            user,
        });
        res.status(200).json(appointment);
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
});
exports.scheduleAppointment = scheduleAppointment;
const cancelAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const cancelledAppointment = yield (0, appointmentService_1.cancelAppointmentService)(Number(id));
        res.status(200).json({ message: `El turno con id ${id} fue cancelado`, appointment: cancelledAppointment });
    }
    catch (error) {
        res.status(400).json({
            message: error.message || `Error al cancelar el turno: ${id}`
        });
    }
});
exports.cancelAppointment = cancelAppointment;
