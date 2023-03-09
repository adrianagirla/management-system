import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from 
    '@angular/material/core';

import { HeaderComponent } from './header/header.component';
import { PatientModule } from './patients/patient.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';

import { AppointmentModule } from './appointments/appointment.module';
import { HttpErrorInterceptor } from './shared/http-error.interceptor';
 import { HomeModule } from './home/home.module';

 

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
     
        
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass:HttpErrorInterceptor,
        multi: true 
    }],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatInputModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        PatientModule,
        HttpClientModule,
        MatToolbarModule,
        AppointmentModule,
        HomeModule
    ]
})
export class AppModule { }
