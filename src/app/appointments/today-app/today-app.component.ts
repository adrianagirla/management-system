import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable } from 'rxjs';
import { Patient } from 'src/app/patients/patient.model';
import { PatientService } from 'src/app/patients/patient.service';
import { Appointment } from '../appointment.model';
import { AppointmentService } from '../appointment.service';
import { NewAppointmentComponent } from '../new-appointment/new-appointment.component';

@Component({
  selector: 'today-app',
  templateUrl: './today-app.component.html',
})
export class TodayAppointmentComponent implements OnInit {
  appointments$ !: Observable<any>;
  appointment!: Appointment;
  displayColumns: string[]= ['date', 'time', 'firstName', 'lastName','diagnosis', 'procedure', 'medical report'];
  today = new Date()
  todayFormat = this.today.toISOString()
  constructor(public appointmentService: AppointmentService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
  this.todayAp()
   }

   todayAp(){
   this.appointments$= this.appointmentService.getAllAppointments().pipe(
    map( appoints => appoints.filter(app => app.date.slice(0,10) === this.todayFormat.slice(0,10)))
    )}

  deleteAppointment(id:number) : void {
    this.appointmentService.deleteAppointment(id).subscribe(res => this.appointment = res)
  }

  updateAppointment(appointment : Appointment){
    const dialogRef = this.dialog.open(NewAppointmentComponent, {
      data: appointment,
   })} 

}





 
