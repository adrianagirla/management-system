import { Component, Inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { Observable, startWith, map } from 'rxjs';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Patient } from 'src/app/patients/patient.model';
import { PatientService } from 'src/app/patients/patient.service';
import { DatePipe } from '@angular/common';
import { AppointmentService } from '../appointment.service';
import { Router } from '@angular/router';
import { Appointment, Availability } from '../appointment.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'new-appointment',
  templateUrl: './new-appointment.component.html',
  encapsulation: ViewEncapsulation.None
})

export class NewAppointmentComponent implements OnInit {

  updatedTimeSlot!: Availability;
  patients: Patient[] = [];
  filteredOptions!: Observable<Patient[]>;
  timeSlots: Availability[] = [];
  procedures = ['Initial Evaluation', 'Reevaluation', 'Abdominal ultrasonography', 'Joint ultrasonography', 'Infiltration']

  constructor(public patientService: PatientService,
    public appointmentService: AppointmentService,
    public fb: FormBuilder,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public app: Appointment,
    private dialogRef: MatDialogRef<NewAppointmentComponent>) { }

  ngOnInit() {
    if (this.app) this.atach()
    this.getAllPatients()
    //Autocompletion options
    this.filteredOptions = this.patient.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.patients.slice();
      }),
    );
  }

  newAppointmentForm = this.fb.group({
    id: [''],
    procedure: [''],
    time: ['', Validators.required],
    patient: ['', Validators.required],
    date: ['', Validators.required],
    history: [''],
    treatment: [''],
    diagnosis: [''],
    clinicalExam: ['']
  })

  get patient() {
    return this.newAppointmentForm.controls['patient']
  }

  get date() {
    return this.newAppointmentForm.controls['date']
  }

  get time() {
    return this.newAppointmentForm.controls['time']
  }

  atach() {
    this.newAppointmentForm.patchValue(this.app)
  }

  getAllPatients() {
    this.patientService.getAllPatients().subscribe(res => this.patients = res)
  }

  getTimeSlots() {
    let date = new Date(this.date.value)
    let d = date.toISOString()
    this.appointmentService.getBooking().pipe(
      map(spots => spots.filter((spotsOnDate: Availability) => spotsOnDate.date.slice(0,10) === d.slice(0,10)))
    ).
      subscribe(res => this.timeSlots = res)
  }

  addAppointment() {
    if (this.app) this.appointmentService.updateAppointment(this.app.id, this.newAppointmentForm.value).subscribe(
      {
        next: (res) => {
          alert("updateed succesfully")
        }
      });

    else
      this.appointmentService.addAppointment(this.newAppointmentForm.value).subscribe(
        {
          next: (res) => {
            alert("adeed succesfully")
          }
        });

    this.updateTimeSlots()

  }

  updateTimeSlots() {
    this.appointmentService.updateTimeSlot(this.updatedTimeSlot.id, this.updatedTimeSlot).subscribe(
      {
        error(err: any) {
          console.error('something wrong occurred: ' + err);
        }
      })
  }

  getSelectedSlot(selectedTimeSlot: Availability) {
    //  if (this.app) this.appointmentService.getTimeSlotById(selectedTimeSlot.id).pipe(
    //   map(res => res.isBooked=!res.isBooked)).subscribe(res=>console.log(res)) 
    selectedTimeSlot['isBooked'] = !selectedTimeSlot.isBooked
    this.updatedTimeSlot = selectedTimeSlot
    return this.updatedTimeSlot
  }


  // using datepicker from angular material

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDay();

      // Highlight the 1st and 20th day of each month.
      return date === 0 || date === 6 ? 'full-date-class' : '';
    }
    return '';
  };

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };


  //Autocompletion from angular material
  displayFn(user: Patient): string {
    let name = user.firstName.concat(" ", user.lastName)
    return name
  }

  private _filter(name: string): Patient[] {
    const filterValue = name.toLowerCase().trim();

    return this.patients.filter(option => option.firstName.toLowerCase().includes(filterValue) || option.lastName.toLowerCase().includes(filterValue));
  }

}
