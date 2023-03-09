import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header',
  template: `<mat-toolbar> 
                    <ul>
                        <li><a   routerLink="/home" routerLinkActive="active" ariaCurrentWhenActive="page">Home</a></li>
                        <li><a routerLink="/appointments" routerLinkActive="active" ariaCurrentWhenActive="page" >Appointments</a></li>
                        <li><a routerLink="/patients" routerLinkActive="active" ariaCurrentWhenActive="page" >Patients</a></li>     
                    </ul>
            </mat-toolbar>`,

})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
