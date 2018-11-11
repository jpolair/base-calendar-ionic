import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseCalendarComponent } from './case-calendar.component';

describe('CaseCalendarComponent', () => {
  let component: CaseCalendarComponent;
  let fixture: ComponentFixture<CaseCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
