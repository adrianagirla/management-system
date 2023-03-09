import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Patient } from '../patient.model';
import { PatientService } from '../patient.service';


@Component({
  selector: 'new-patient',
  templateUrl: './new-patient.component.html',
})
export class NewPatientComponent implements OnInit {
  
  genders = ['male','female', 'other']
  id!: number;
  allPatients: Patient[]=[];
  patient!: Patient;

  constructor(public patientService: PatientService,
              public fb : FormBuilder) { }

 ngOnInit(): void {
  } 

  newPatientForm = this.fb.group({
    id:[''],
    firstName :['', {
      validators : [Validators.required, Validators.pattern('[a-zA-Z ]*'),],
      updateOn: 'blur'
    }] ,
    lastName:['', {
      validators : [Validators.required, Validators.pattern('[a-zA-Z ]*')],
      updateOn: 'blur'
    }] ,
    gender: [''],
    diagnosis: [''],
    phone: ['', {
      validators : [Validators.required,  Validators.pattern('[0-9]*'),],
      updateOn: 'blur'
    }] ,
    email: ['', {
      validators: [Validators.email],
      updateOn: 'blur'
    } ],
    idn: ['', {
      validators : [Validators.required, Validators.pattern('[0-9]*'),
                    Validators.maxLength(13), Validators.minLength(13)],
      updateOn: 'blur'
    }] ,
    age: ['', Validators.maxLength(3) ],
    job: [''],
    address: [''],
    city: [''],
    teritory: ['']
  })
  
  
  get firstName(){
    return this.newPatientForm.controls['firstName']
  }

  get lastName(){
    return this.newPatientForm.controls['lastName']
  }

  get idn(){
    return this.newPatientForm.controls['idn']
  }
  get phone(){
    return this.newPatientForm.controls['phone']
  }
  get email(){
    return this.newPatientForm.controls['email']
  }
              
  newPatient(){
       this.patientService.addPatient(this.newPatientForm.value).subscribe(res => console.log(res))
  }

  nameErrorMessage(field: string) {
    const nameControl = this.newPatientForm.controls[`${field}`]
    if (nameControl.hasError('required')) {
      return `Name is mandatory`;
    }
    return nameControl.hasError('pattern') ? `Name must contain only letters` : '';
  }
 
  idnErrorMessage(){
    if (this.idn.hasError('required') ){
      return `IDN is mandatory`;
    }
    if(this.idn.hasError('pattern')) {
      return `Only numbers accepted` ;
    } 
    if(this.idn.hasError('minlength') ) {
      return `Add more digits, 13 required` ;
  }
    return  this.idn.hasError('maxlength') ?`Too many digits, 13 required` : '';
  }

  phoneErrorMessage(){
    if (this.phone.hasError('required')) {
      return `Phone is mandatory`;
    }
    return this.phone.hasError('pattern') ? `Only numbers accepted` : '';
  }
 emailErrorMessage(){
  return this.email.hasError('email') ? `Invalid mail adress, ex: name@domain.com` : '';
 }

  }

