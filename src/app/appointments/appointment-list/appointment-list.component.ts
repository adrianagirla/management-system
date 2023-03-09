import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs';
import { Patient } from 'src/app/patients/patient.model';
import { PatientService } from 'src/app/patients/patient.service';
import { Appointment } from '../appointment.model';
import { AppointmentService } from '../appointment.service';
import { NewAppointmentComponent } from '../new-appointment/new-appointment.component';

@Component({
  selector: 'appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {
  appointment!: Appointment;
  dataSource!: MatTableDataSource<Appointment>;
  
  displayColumns: string[]= ['date', 'time', 'firstName', 'lastName','diagnosis', 'procedure', 'medical report']
  constructor(public appointmentService: AppointmentService,
              private _liveAnnouncer: LiveAnnouncer,
              public dialog: MatDialog) { }

    @ViewChild(MatSort)
    sort: MatSort = new MatSort;
    @ViewChild(MatPaginator)
    paginator!: MatPaginator;

  ngOnInit(): void {
  this.getAllAppointments(); }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getAllAppointments(): void {
     this.appointmentService.getAllAppointments()
     .subscribe((res)=>{
      this.dataSource = new MatTableDataSource(res);
       this.dataSource.sort = this.sort;
       this.dataSource.paginator = this.paginator;
       })
  }

  deleteAppointment(id:number) : void {
    this.appointmentService.deleteAppointment(id).subscribe( {
      next: (res)=>{
        alert("deleted succesfully")
      }});
    
      this.getAllAppointments();
  }

newAppointment(){
  const dialogRef = this.dialog.open(NewAppointmentComponent)
}
updateAppointment(app : Appointment){
  const dialogRef = this.dialog.open(NewAppointmentComponent, {
    data: app,
 })
} 

//Using angular material sorting
announceSortChange(sortState: Sort) {
  if (sortState.direction) {
    this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  } else {
    this._liveAnnouncer.announce('Sorting cleared');
  }
}

//Not working properly, filters data in appointment list only, without getting nested properties.
//need to implement for appointment.patient.firstname and lastname. Working on it.
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
}









 
