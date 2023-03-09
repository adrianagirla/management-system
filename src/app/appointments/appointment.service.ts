import { Injectable } from '@angular/core';
import{ HttpHeaders, HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Appointment, Availability } from './appointment.model';
 

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private appointmentURL = 'http://localhost:3000/appointments/';
  private bookingUrl = 'http://localhost:3000/avalaible/'
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  constructor(
    private http: HttpClient) { }

  getBooking(): Observable<Availability[]> {
    return this.http.get<Availability[]>(this.bookingUrl)
  }

  updateTimeSlot(id: number, updatedSlot: Availability): Observable<Availability> {
    return this.http.put<Availability>(this.bookingUrl + id, updatedSlot, this.httpOptions)
  }

  getTimeSlotById(id: number): Observable<Availability> {
    return this.http.get<Availability>(this.bookingUrl + id)
  }

  getAllAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.appointmentURL);
  }

  getAppointmentById(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(this.appointmentURL + id)
  }

  deleteAppointment(id: number): Observable<Appointment> {
    return this.http.delete<Appointment>(this.appointmentURL + id, this.httpOptions);
  }

  updateAppointment(id: number, app: Appointment): Observable<Appointment> {
    return this.http.put<Appointment>(this.appointmentURL + id, app, this.httpOptions);
  }
  addAppointment(newApp: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.appointmentURL, newApp)
  }

}
