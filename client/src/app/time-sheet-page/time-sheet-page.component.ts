import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { Moment } from 'moment';

import { ITimeSheet } from '../../../../src/time-sheet/interfaces/timeSheet.interface';
import { TimeSheetService } from '../services/time-sheet.service';
import { ActivatedRoute } from '@angular/router';
import { IOrganization } from '../../../../src/organization/interfaces/organization.interface';
import { CatalogsService } from '../services/catalog.service';
import { ISubdivision } from '../../../../src/subdivision/interfaces/subdivision.interface';
import { MatDialog } from '@angular/material/dialog';
import { SubdivisionSelectDialogComponent } from '../subdivision-select-dialog/subdivision-select-dialog.component';
import { WindowState } from '../shared/window';
import { IListMode } from '../shared/window.enums';
import { AlertService } from '../services/alert.service';

const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-time-sheet-page',
  templateUrl: './time-sheet-page.component.html',
  styleUrls: ['./time-sheet-page.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},

  ],
})
export class TimeSheetPageComponent implements OnInit{

  public timeSheet: ITimeSheet;
  public title = '';
  public date = new Date()
  public period = new Date()
  public organizationList: IOrganization[] = <IOrganization[]>[]
  public subdivisionList: ISubdivision[] = <ISubdivision[]>[]
  public periodPicker = new FormControl(moment());


  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.periodPicker.value;
    ctrlValue.year(normalizedYear.year());
    this.periodPicker.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.periodPicker.value;
    ctrlValue.month(normalizedMonth.month());
    this.periodPicker.setValue(ctrlValue);
    datepicker.close();
  }

  constructor(
    private _adapter: DateAdapter<any>,
    private timeSheetService: TimeSheetService,
    private catalogsService: CatalogsService,
    private activeRouter: ActivatedRoute,
    public dialog: MatDialog,
    private alert: AlertService) {
      this._adapter.setLocale('ru');
  }

  ngOnInit(){
    this.fetchOrganization()
    this.activeRouter.params.subscribe( params => {
      if (params.id && params.id != 'new') {
        this.fetchTimeSheet(params.id)
      } else if (params.id) {
        this.title = 'Табель (создание)'
        this.timeSheet = <ITimeSheet>{}
      }
    })
  }

  fetchTimeSheet(pk: string) {
    this.timeSheetService.getTimeSheetListById(pk).subscribe(timeSheet => {
      console.log(timeSheet)
      this.timeSheet = timeSheet
      this.date = new Date(this.timeSheet.date)
      this.period = new Date(this.timeSheet.period)
      this.title = `Табель от ${this.timeSheet.date}`
    })
  }

  fetchOrganization() {
    this.catalogsService.getOrganizationList().subscribe(organizationList => {
      this.organizationList = organizationList
    })
  }


  openSubdivisionSelectDialog() {

    if (!this.timeSheet.organizationPk) {
      this.alert.warning('Не выбрана организация');
      return
    }

    const subdivisionWindowState = <WindowState>{
      mode: IListMode.select,
      selectedRow: this.timeSheet.subdivisionPk,
      params: {organizationPk: this.timeSheet.organizationPk}
    }

    const dialogRef = this.dialog.open(SubdivisionSelectDialogComponent, {
      width: '80%',
      height: '80%',
      data: subdivisionWindowState
    });

    dialogRef.afterClosed().subscribe((result: WindowState ) => {
      if (result) {
        this.timeSheet.subdivisionPk = result.selectedRow
        this.timeSheet.subdivisionName = result.params.selectedRowItem.name
      }
    });

  }

  onOrganizationChanged() {

  }

  clearSubdivision() {
    this.timeSheet.subdivisionPk = null
    this.timeSheet.subdivisionName = ''
  }

  createTimeSheet() {

  }
}
