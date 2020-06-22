import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';


import { TimeSheetInterface } from '../../../../src/time-sheet/interfaces/timeSheet.interface';
import { TimeSheetService } from '../services/time-sheet.service';
import { ActivatedRoute } from '@angular/router';
import { IOrganization } from '../../../../src/organization/interfaces/organization.interface';
import { CatalogsService } from '../services/catalog.service';
import { ISubdivision } from '../../../../src/subdivision/interfaces/subdivision.interface';

@Component({
  selector: 'app-time-sheet-page',
  templateUrl: './time-sheet-page.component.html',
  styleUrls: ['./time-sheet-page.component.scss']
})
export class TimeSheetPageComponent implements OnInit{

  public timeSheet: TimeSheetInterface;
  public title = '';
  public date = new Date()
  public period = new Date()
  public organizationList: IOrganization[] = <IOrganization[]>[]
  public subdivisionList: ISubdivision[] = <ISubdivision[]>[]

  constructor(
    private timeSheetService: TimeSheetService,
    private catalogsService: CatalogsService,
    private activeRouter: ActivatedRoute) { }

  ngOnInit(){
    this.fetchOrganization()
    this.activeRouter.params.subscribe( params => {
      if (params.id && params.id != 'new') {
        this.title = 'Табель (создание)'
        this.fetchTimeSheet(params.id)
      } else if (params.id) {
        this.title = 'Табель (создание)'
        this.timeSheet = <TimeSheetInterface>{}
      }
    })
  }

  fetchTimeSheet(pk: string) {
    this.timeSheetService.getTimeSheetListById(pk).subscribe(timeSheet => {
      this.timeSheet = timeSheet
    })
  }

  fetchOrganization() {
    this.catalogsService.getOrganizationList().subscribe(organizationList => {
      this.organizationList = organizationList
    })
  }

  fetchSubdivision() {
    console.log(this.timeSheet.organizationPk)
    this.catalogsService.getSubdivisionByOrganizationList(this.timeSheet.organizationPk).subscribe(subdivisionList => {
      this.subdivisionList = subdivisionList
    })
  }


  chosenYearHandler($event) {
    1+1
  }

  chosenMonthHandler($event) {
    1+1
  }
}
