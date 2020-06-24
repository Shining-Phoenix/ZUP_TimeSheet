import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ITimeSheet } from '../../../../src/time-sheet/interfaces/timeSheet.interface';
import { TimeSheetService } from '../services/time-sheet.service';
import { PageHeaderComponent } from '../page-header/page-header.component';
import { IListMode } from '../shared/window.enums';
import { WindowState } from '../shared/window';

interface ITableHeader{
  name: string
  captipn: string
  width: string
}


@Component({
  selector: 'app-time-sheet-list-page',
  templateUrl: './time-sheet-list-page.component.html',
  styleUrls: ['./time-sheet-list-page.component.scss']
})
export class TimeSheetListPageComponent implements OnInit{

  displayedColumns: string[] = [
    'date', 'period',
    "confirmedByTimekeeper", "confirmedBy1c", "statusName",
    "organizationName", "subdivisionName"];


  public timeSheetList: ITimeSheet[];
  public selectedTimeSheet: number

  constructor(
    private timeSheetService: TimeSheetService,
    private router: Router) { }

  ngOnInit(): void {
    this.timeSheetService.getTimeSheetListForKeeper().subscribe(timeSheetList => {
      this.timeSheetList = timeSheetList;
    })
  }

  createTimeSheet() {
    this.router.navigate(['time-sheet/new'])
  }


  openTimeSheet(timeSheet: ITimeSheet) {
    this.router.navigate([`time-sheet/${timeSheet.pk}`])
  }
}
