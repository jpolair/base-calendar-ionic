import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CalendarPage } from './calendar.page';
import { CalendarViewComponent } from '../calendar-view/calendar-view.component';
import { CaseCalendarComponent } from '../case-calendar/case-calendar.component';

const routes: Routes = [
  {
    path: '',
    component: CalendarPage
  }
];

@NgModule({
  imports: [
    
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CalendarPage,CalendarViewComponent, CaseCalendarComponent]
})
export class CalendarPageModule {}
