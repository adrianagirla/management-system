import { trigger, state, style, transition, animate } from '@angular/animations';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NewPatientComponent } from '../new-patient/new-patient.component';
import { Patient } from '../patient.model';
import { PatientService } from '../patient.service';


@Component({
  selector: 'patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PatientListComponent implements OnInit {

  id!: number;
  allPatients: Patient[]=[];
  patient!: Patient;
  displayColumns: string[]= ['idn','firstName', 'lastName', 'age','diagnosis',  'details']
  dataSource!: MatTableDataSource<Patient>;
  expandedElement?: Patient | null;

  constructor(public patientService: PatientService,
              private _liveAnnouncer: LiveAnnouncer,
              public dialog: MatDialog
    ) { }
   
    @ViewChild(MatSort)
  sort: MatSort = new MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  
ngOnInit(): void {
this.getAllPatients();
}
ngAfterViewInit() {
  this.dataSource.sort = this.sort;
  this.dataSource.paginator = this.paginator;
}

getAllPatients(): void {
this.patientService.getAllPatients().subscribe((res)=>{
 this.dataSource = new MatTableDataSource(res);
  this.dataSource.sort = this.sort;
  this.dataSource.paginator = this.paginator;
})
}

getPatient(id:number) : void {
this.patientService.getPatientById(id).subscribe(res => this.patient =res)

}

deletePatient(id:number) : void {
this.patientService.deletePatient(id).subscribe(res => this.patient =res)
}

openNewPatient(){
  const dialogRef = this.dialog.open(NewPatientComponent)
}

announceSortChange(sortState: Sort) {
  // This example uses English messages. If your application supports
  // multiple language, you would internationalize these strings.
  // Furthermore, you can customize the message to add additional
  // details about the values being sorted.
  if (sortState.direction) {
    this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  } else {
    this._liveAnnouncer.announce('Sorting cleared');
  }
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

}


