import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateDatepickerComponent } from './date-datepicker.component';

describe('DateDatepickerComponent', () => {
  let component: DateDatepickerComponent;
  let fixture: ComponentFixture<DateDatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateDatepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
