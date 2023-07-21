import { Types } from "mongoose"

export interface IUser {
    name: string,
    email: string,
    password: string,
}

export interface IPatient {
    name: string,
    mobile: number, 
}

export interface IAppointment {
    dentistId: Types.ObjectId,
    patientId: Types.ObjectId,
    appointmentDate: Date,
}

export interface IAdvertising {
    advertisement: string,
}