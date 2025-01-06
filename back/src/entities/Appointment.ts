import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"

export enum AppointmentStatus {
    ACTIVE = "active",
    CANCELLED = "cancelled"
}

@Entity({
    name:"apointments"
})

export class Appointment{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: string;

    @Column()
    time: string;

    @Column({
        type:"enum",
        enum: AppointmentStatus,
        default: "active",
    })
    status: AppointmentStatus

    @ManyToOne(() => User, (user) => user.appointments)
    user: User;
}