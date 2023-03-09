import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AppointmentService } from '../appointment.service';
import { Appointment } from '../appointment.model';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  appointment !: Appointment;

  constructor(private _ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    private appService : AppointmentService) { 

    }

  ngOnInit(): void {
    
    let id = this.route.snapshot.paramMap.get('id');
    let iD = Number(id) 
     this.appService.getAppointmentById(iD).subscribe(p => this.appointment =p)
   
  }

  @ViewChild('pdfReport', { static: false })
  pdfReport!: ElementRef;

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  public openPDF(): void {
    let DATA: any = document.getElementById('pdfReport');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/jpg');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'JPG', 0, position, fileWidth, fileHeight);
      PDF.save('report.pdf');
    });
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

}
