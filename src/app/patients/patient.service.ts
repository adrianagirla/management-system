import { Injectable } from '@angular/core';
import{ HttpHeaders, HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import { Patient } from './patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private patientURL = 'http://localhost:3000/patients/';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  constructor(
    private http: HttpClient) { }

  getAllPatients(): Observable<Patient[]>{
    return this.http.get<Patient[]>(this.patientURL);
  }

  getPatientById(id:number): Observable<Patient>{
    return this.http.get<Patient>(this.patientURL+id)
  }

  deletePatient(id:number): Observable<Patient>{
    return this.http.delete<Patient>(this.patientURL+id, this.httpOptions);
  }

  addPatient(newPatient: Patient){
    return this.http.post(this.patientURL, newPatient)

  }

 
  
}
