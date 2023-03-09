import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'week-app',
  templateUrl: './week-app.component.html',
  styleUrls: ['./week-app.component.scss']
})
export class WeekAppComponent implements OnInit {

timeSlots = ['8:00-8:30','8:30-9:00','9:00-9:30','9:30-10:00','10:00-10:30','10:30-11:00','10:30-11:00','11:00-11:30','11:30-12:00','12:00-12:30']
today = new Date()
weekDays = this.dates(this.today)

  constructor() { }

  ngOnInit(): void {
  }

dates(current: Date) {
  var week= new Array(); 
  // Starting Monday not Sunday
  current.setDate((current.getDate() - current.getDay() +1));
  for (var i = 0; i < 5; i++) {
      week.push(
          new Date(current)
      ); 
      current.setDate(current.getDate() +1);
  }
  return week; 
}

}
