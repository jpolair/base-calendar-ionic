import { Component, OnInit } from '@angular/core';

export interface Day {
  range: number;
  indexDay: number;
  indexMonth: number;
  currentMonth: string;
  currentDayOfWeek: string;
  currentDayOfMonth: number;
  year: number;
  planning: Planning[];
}

export interface Planning {
  plan: string;
  status: boolean;
  date: Date;
  startTime: Date;
  endTime: Date;
}

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss']
})
export class CalendarViewComponent implements OnInit {
  today: Date;
  planning: Planning[];
  isToday: any = {};
  daysOfWeekNoOrder: string[] = ['Dimanche','Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  daysOfWeek: string[] = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  eachMonth: string[] = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  indexDay: number;
  indexMonth: number;
  currentYear: number;
  currentMonth: string;
  currentDayOfWeek: string;
  currentDayOfMonth: number;
  currentMonthLength: number;
  currentMonthDays: Day[] = [];

  constructor() { }

  ngOnInit() {
    this.planning = [
      {
        plan: 'YZ-21-233',
        status: true,
        date: new Date(2018,10,19),
        startTime: new Date(2018,10,19,1,10),
        endTime: new Date(2018,10,19,4,10)
      },
      {
        plan: 'YZ-21-255',
        status: true,
        date: new Date(2018,10,21),
        startTime: new Date(2018,10,21,5,0),
        endTime: new Date(2018,10,19,6,0) 
      }
    ]
    

    this.initCurrentValues()
  }

  initCurrentValues () {
    this.today = new Date();
    this.currentYear = this.today.getFullYear();
    this.indexMonth = this.today.getMonth(); // index mois 
    this.indexDay = this.today.getDay(); // index jour de la semaine
    this.currentDayOfMonth = this.today.getDate(); // jour du mois
    this.currentMonth = this.eachMonth[this.indexMonth]; // mois courant en lettre 
    this.currentDayOfWeek = this.daysOfWeekNoOrder[this.indexDay]; // jour en lettre 
    this.currentMonthLength = this.daysInMonth(this.currentYear, this.indexMonth);
    console.log('year', this.currentYear, 'indexmonth', this.indexMonth, 'indexday', this.indexDay, 'currentdayof week', this.currentDayOfWeek, 'monthlength', this.currentMonthLength,)
    console.log('get date 0 ' , new Date(2018, 10, 0).getDate())
    this.isToday = { year: this.currentYear, indexMonth: this.indexMonth, currentDayOfMonth: this.currentDayOfMonth }
    for (let i = 0; i < this.currentMonthLength; i++) { 
      this.currentMonthDays.push(this.createDays(i, this.indexMonth, this.currentYear))
    }
    this.addDaysStartMonth()
    this.addDaysEndsOfMonth()
  }

  daysInMonth(year, month) { // nombre de jour mois en cours
    return new Date(year, (month + 1), 0).getDate();
  }

  daysInLastMonth(year, month) { // nombre de jour un mois avant 
    return new Date(year, month, 0).getDate();
  }

  daysInNextMonth(year, month) { // nombre de jour un mois après
    return new Date(year, (month + 2), 0).getDate();
  }

  checkToday (day: Day) { // pour ajout classe today dans la vue
   if (this.isToday.year == day.year && this.isToday.indexMonth == day.indexMonth && this.isToday.currentDayOfMonth == day.currentDayOfMonth) {
     return true;
   }
  }

  addPlanning (day: number, monthDay: number, yearDay: number) : Planning[]  {
    let plans: Planning[] = []
    this.planning.forEach( (plan) => {
      let date = plan.date.getDate()
      let year = plan.date.getFullYear()
      let month = plan.date.getMonth()
      if (date == (day + 1) && month == monthDay && year == yearDay) {
        plans.push(plan)
      }
    })
    return plans;
  }

  createDays(day: number, month: number, year: number) {
    return {
      range: day,
      currentDayOfMonth: new Date(year, month, day + 1).getDate(),
      currentDayOfWeek: this.daysOfWeek[new Date(year, month, day).getDay()],
      //currentMonth: this.eachMonth[new Date(year, month, day).getMonth()],
      currentMonth: this.eachMonth[month],
      indexMonth: month,
      indexDay: new Date(year, month, day + 1).getDay(),
      year: year,
      planning: this.addPlanning(day, month, year)
    }
  }

  createCalendar() {
    for (let i = 0; i < this.currentMonthLength; i++) { 
      this.currentMonthDays.push(this.createDays(i , this.indexMonth, this.currentYear))
    }
  }

  addDaysStartMonth() {
    if (this.currentMonthDays[0].indexDay == 0) {                                  // si 1er jour du mois pas dimanche
      let totalDays = this.daysInLastMonth(this.currentYear, this.indexMonth ) ; // on ajoute des jours du mois précédent en début de mois
      let difference = totalDays - 6;
      for (let i = totalDays; i > difference; i--) {
        this.currentMonthDays.unshift(this.createDays(i-1, this.indexMonth , this.currentYear));
      }
      return;
    }
    if (this.currentMonthDays[0].indexDay != 0 && this.currentMonthDays[0].indexDay != 1) { // si 1er jour du mois pas dimanche et pas lundi
      let totalDays = this.daysInLastMonth(this.currentYear, this.indexMonth);          // on ajoute des jours du mois précédent en début de mois    
      let difference = totalDays - (this.currentMonthDays[0].indexDay - 1);
     for (let i = totalDays; i > difference; i--) {
       console.log(i)
        this.currentMonthDays.unshift(this.createDays(i - 1, this.indexMonth - 1 , this.currentYear));
      }
      return;
    }
  }

  addDaysEndsOfMonth() {
    let last = this.currentMonthDays.length - 1;
    if (this.currentMonthDays[last].indexDay == 0) {
      return;
    } else {
      let difference = 7 - this.currentMonthDays[last].indexDay
      for (let i = 0; i < difference; i++) {
        this.currentMonthDays.push(this.createDays(i, this.indexMonth + 1 != 12 ? this.indexMonth + 1 : 0, this.currentYear))
      }
    }
  }

  goToNextMonth() {
    if (this.indexMonth != 11) {
      this.currentMonthDays = [];
      this.indexMonth += 1;
      this.currentMonth = this.eachMonth[this.indexMonth];
      this.currentMonthLength = this.daysInMonth(this.currentYear, this.indexMonth);
      console.log('month length ', this.currentMonthLength)
      this.createCalendar();
      this.addDaysStartMonth();
      this.addDaysEndsOfMonth()
      return;
    }
    if (this.indexMonth == 11) {
      this.currentMonthDays = [];
      this.currentYear += 1;
      this.indexMonth = 0;
      this.currentMonth = this.eachMonth[this.indexMonth];
      this.currentMonthLength = this.daysInMonth(this.currentYear, this.indexMonth);
      this.createCalendar();
      this.addDaysStartMonth();
      this.addDaysEndsOfMonth()
      return;
    }
  }

  goToLastMonth() {
    if (this.indexMonth != 0) {
      this.currentMonthDays = [];
      this.indexMonth -= 1;
      this.currentMonth = this.eachMonth[this.indexMonth];
      this.currentMonthLength = this.daysInMonth(this.currentYear, this.indexMonth);
      this.createCalendar();
      this.addDaysStartMonth();
      this.addDaysEndsOfMonth()
      return;
    }
    if (this.indexMonth == 0) {
      this.currentMonthDays = [];
      this.currentYear -= 1;
      this.indexMonth = 11;
      this.currentMonth = this.eachMonth[this.indexMonth];
      this.currentMonthLength = this.daysInMonth(this.currentYear, this.indexMonth);
      this.createCalendar();
      this.addDaysStartMonth();
      this.addDaysEndsOfMonth()
      return;
    }
  }

  eventDay(day: Day) {
    // TODO create modal
    console.log(day)
  }
}