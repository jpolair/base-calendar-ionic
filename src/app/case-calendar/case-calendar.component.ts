import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-case-calendar',
  templateUrl: './case-calendar.component.html',
  styleUrls: ['./case-calendar.component.scss']
})
export class CaseCalendarComponent implements OnInit, OnChanges {
  @Input() day: any;
  @Output() eventDay: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    //console.log('day in case calendar ', this.day)
  }

  ngOnChanges() {

  }

  caseClicked() {
    this.eventDay.emit(this.day)
  }

}
