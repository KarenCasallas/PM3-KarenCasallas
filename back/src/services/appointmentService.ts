import AppointmentDto from "../dto/AppointmentDto";
import IAppointment from "../interfaces/IAppointment";
import { Appointment, AppointmentStatus } from "../entities/Appointment";
import { appointmentModel } from "../config/data-source";
import { getUserById } from "../controllers/usersController";
import { getUserByIdService } from "./userService";
import { User } from "../entities/User";
import { FindManyOptions } from "typeorm";

export const getAllAppointmentsService = async(userId?: number): Promise<Appointment[]> => {
    const options: FindManyOptions<Appointment> = {
        relations:{
            user: true,
        },
    };

    if (userId){
        options.where = {
            user: {
                id: userId,
            },    
        };
    };

    const allAppointments: Appointment[] = await appointmentModel.find(options);
    return allAppointments;
};

export const getAppointmentByIdService = async(id:number): Promise<Appointment> => {
    const foundAppointment: Appointment | null = await appointmentModel.findOne({
        where:{ id },
        relations :["user"],
    });
    if(!foundAppointment) throw new Error("La cita con el ${id} no existe");
    return foundAppointment;
};

export const scheduleAppointmentService = async(createAppointment: AppointmentDto): Promise<Appointment> => {

    const  user =  await getUserByIdService(createAppointment.user); 

    const newAppointment = await appointmentModel.create({
        
        date: createAppointment.date,
        time: createAppointment.time,
        user: user,
        status: AppointmentStatus.ACTIVE,
    });

    const results : Appointment = await appointmentModel.save(newAppointment);
    return results;
};


export const cancelAppointmentService = async(id : number): Promise<number> => {
    
    const appointment: Appointment = await getAppointmentByIdService(id);

    if(appointment.status == "cancelled") throw new Error("Su cita ya ha sido cancelada");

    appointment.status = AppointmentStatus.CANCELLED;

    const results: Appointment = await appointmentModel.save(appointment); 

    return results.id;
};
    
