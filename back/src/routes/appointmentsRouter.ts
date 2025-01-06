import { Router } from "express";
import { getAllAppointmets, getAppointmentById, scheduleAppointment, cancelAppointment } from "../controllers/appointmentsController";

const appointmentsRouter: Router = Router();

appointmentsRouter.get("/:userId?", getAllAppointmets);
appointmentsRouter.get("/:id", getAppointmentById);
appointmentsRouter.post("/schedule", scheduleAppointment);
appointmentsRouter.put("/cancel/:id", cancelAppointment);

export default appointmentsRouter;