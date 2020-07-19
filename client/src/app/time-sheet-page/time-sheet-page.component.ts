import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';


import { ITimeSheet } from '../../../../src/time-sheet/interfaces/timeSheet.interface';
import { TimeSheetService } from '../services/time-sheet.service';
import { ActivatedRoute } from '@angular/router';
import { IOrganization } from '../../../../src/organization/interfaces/organization.interface';
import { CatalogsService } from '../services/catalog.service';
import { ISubdivision } from '../../../../src/subdivision/interfaces/subdivision.interface';
import { MatDialog } from '@angular/material/dialog';
import { SelectListItemDialogComponent } from '../select-list-item-dialog/select-list-item-dialog';
import { WindowState } from '../shared/window';
import { IListMode } from '../shared/window.enums';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-time-sheet-page',
  templateUrl: './time-sheet-page.component.html',
  styleUrls: ['./time-sheet-page.component.scss']
})
export class TimeSheetPageComponent implements OnInit{

  public timeSheet: ITimeSheet;
  public title = '';
  public date = new Date()
  public period = new Date()
  public organizationList: IOrganization[] = <IOrganization[]>[]
  public subdivisionList: ISubdivision[] = <ISubdivision[]>[]

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
      params: {organizationPk: this.timeSheet.organizationPk},
      dialogComponent: 'SubdivisionListComponent'
    }

    const dialogRef = this.dialog.open(SelectListItemDialogComponent, {
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
