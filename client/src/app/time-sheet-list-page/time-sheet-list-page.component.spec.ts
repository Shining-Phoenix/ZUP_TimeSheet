import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSheetListPageComponent } from './time-sheet-list-page.component';

describe('TimeSheetListPageComponent', () => {
  let component: TimeSheetListPageComponent;
  let fixture: ComponentFixture<TimeSheetListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSheetListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSheetListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
