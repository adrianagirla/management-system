import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'appointments',
  template: `<mat-tab-group mat-stretch-tabs="false"
                            mat-align-tabs="center"
                            [selectedIndex]="0">
                  <mat-tab label="Today Appointments"><today-app></today-app></mat-tab>
                  <mat-tab label="This Week Appointments"><week-app></week-app></mat-tab>
                  <mat-tab label="All Appointments"><appointment-list></appointment-list></mat-tab>
            </mat-tab-group>` ,

})
export class AppointmentsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
