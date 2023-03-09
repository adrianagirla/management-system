import { Patient } from "../patients/patient.model";

export interface Availability{
    id:number,
    date: string;
    slot:string;
    isBooked: boolean;
}
export interface Appointment{
    id: number;
    patient: Patient;
    date: string;
    time: string;
    procedure: string;
    diagnnosis: string;
    clinicalExam:string;
    history: string;
    treatment:string;
}