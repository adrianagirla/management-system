import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { NewAppointmentComponent } from './new-appointment/new-appointment.component';
import { ReportComponent } from './report/report.component';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from '../app-routing.module';
import { WeekAppComponent } from './week-app/week-app.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AppointmentsComponent } from './appointments.component';
import { TodayAppointmentComponent } from './today-app/today-app.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TextFieldModule } from '@angular/cdk/text-field';

@NgModule({
    declarations: [
        AppointmentListComponent,
        NewAppointmentComponent,
        ReportComponent,
        TodayAppointmentComponent,
        WeekAppComponent,
        AppointmentsComponent,
    ],
    exports: [
        AppointmentListComponent,
        NewAppointmentComponent,
        ReportComponent
    ],
    imports: [
        CommonModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatTableModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        MatTooltipModule,
        MatFormFieldModule,
        MatInputModule,
        AppRoutingModule,
        MatTabsModule,
        MatPaginatorModule,
        MatSortModule,
        TextFieldModule

    ]
})
export class AppointmentModule { }
