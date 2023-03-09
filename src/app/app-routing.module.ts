import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentListComponent } from './appointments/appointment-list/appointment-list.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { ReportComponent } from './appointments/report/report.component';
import { WeekAppComponent } from './appointments/week-app/week-app.component';
import { PatientListComponent } from './patients/patient-list/patient-list.component';

import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'appointments', component: AppointmentsComponent },
  { path: 'patients', component: PatientListComponent },
  { path: 'appointments/:id', component: ReportComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
