import { Component, OnInit } from '@angular/core';
import { TimeSheetInterface } from '../../../../src/time-sheet/interfaces/timeSheet.interface';
import { TimeSheetService } from '../services/time-sheet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-time-sheet-list-page',
  templateUrl: './time-sheet-list-page.component.html',
  styleUrls: ['./time-sheet-list-page.component.scss']
})
export class TimeSheetListPageComponent implements OnInit {

  public timeSheetList: TimeSheetInterface[];
  public selectedTimeSheet: number

  constructor(
    private timeSheetService: TimeSheetService,
    private router: Router) { }

  ngOnInit(): void {
    this.timeSheetService.getTimeSheetListForKeeper().subscribe(timeSheetList => {
      this.timeSheetList = timeSheetList;
    })
  }

  openTimeSheet(timeSheet: TimeSheetInterface) {

  }

  activateTimeSheetRow(pk: number) {
    this.selectedTimeSheet = pk
  }

  createTimeSheet() {
    this.router.navigate(['time-sheet/new'])

  }
}
