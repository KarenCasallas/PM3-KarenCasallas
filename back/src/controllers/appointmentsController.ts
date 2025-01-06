import { Request, Response } from "express";
import IAppointment from "../interfaces/IAppointment";
import { getAllAppointmentsService,getAppointmentByIdService,scheduleAppointmentService,cancelAppointmentService } from "../services/appointmentService";
import AppointmentDto from "../dto/AppointmentDto";
import { Appointment } from "../entities/Appointment";

export const getAllAppointmets = async(req: Request,res: Response) => {
    try{
        const {userId} = req.params;
        const appointments: Appointment[] = await getAllAppointmentsService(Number(userId));
        res.status(200).json(appointments);
    } catch (error: any){
        if (error.message == "No hay citas agendadas") {
            res.status(400).json({message: error.message});
            return;
        }
        res.status(500).json({message:error.message});
    } 
};

export const getAppointmentById = async(req: Request,res: Response) => {
    try{
        const { id } = req.params;    
        const appointment: Appointment | null = await getAppointmentByIdService(Number(id));
        res.status(200).json(appointment);
    } catch (error: any){
        res.status(400).json({
            message: error.message,
        });
    } 
};

 export const scheduleAppointment = async (req: Request, res: Response) => { 
    try{
        const {date, time, user} : AppointmentDto = req.body;
        const appointment: Appointment = await scheduleAppointmentService ({
            date,
            time,
            user,
        });
        res.status(200).json(appointment);
        
    } catch (error: any){
        res.status(400).json({
            message: error.message,
        });
    } 
};

export const cancelAppointment = async(req: Request,res: Response) => { 
    
    const { id } = req.params;
    
    try{
        const cancelledAppointment = await cancelAppointmentService(Number(id));
        res.status(200).json({ message: `Su cita con id ${id} fue cancelada con éxito`, appointment: cancelledAppointment });
    } catch (error: any){
        res.status(400).json({
            message: error.message || `Error al cancelar cita: ${id}`
        });
    } 
};

