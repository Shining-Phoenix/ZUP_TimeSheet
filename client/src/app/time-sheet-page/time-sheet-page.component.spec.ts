import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSheetPageComponent } from './time-sheet-page.component';

describe('TimeSheetPageComponent', () => {
  let component: TimeSheetPageComponent;
  let fixture: ComponentFixture<TimeSheetPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSheetPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSheetPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
