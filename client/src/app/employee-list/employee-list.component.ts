import { Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output, Provider } from '@angular/core';
import { Subscription } from 'rxjs';

import { EmployeeService } from '../services/employee.service';
import { IEmployeeList } from '../../../../src/employee/interfaces/employeeList.dto';
import { WindowState } from '../shared/window';
import { IListMode } from '../shared/window.enums';
import { IEmployee } from '../../../../src/employee/interfaces/employee.interface';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit, OnDestroy {

  @Input()
  public windowState: WindowState
  @Output()
  private outputWindowState = new EventEmitter()

  private pSub: Subscription;
  public selectedRow: string
  private selectedObject: IEmployee
  public employeeList: IEmployeeList[];

  constructor(
    private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.getEmployeeListForKeeper().subscribe(employeeList => {
      this.employeeList = employeeList;
    })
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
  }

  emitSelection(windowState: WindowState){
    this.outputWindowState.emit(windowState)
  }

  formSelect() {
    this.windowState.selectedRow = this.selectedRow
    this.windowState.params = {...this.windowState.params, selectedRowItem: this.selectedObject}
    this.emitSelection(this.windowState)
  }

  formCancel() {
    this.emitSelection(null)
  }

  listRowActivate (employee: IEmployee){
    this.selectedRow = employee.pk
    this.selectedObject = employee
  }

  listRowSelect (employee: IEmployee){
    if (this.windowState.mode = IListMode.select) {
      this.windowState.selectedRow = employee.pk
      this.windowState.params = {...this.windowState.params, selectedRowItem: employee}
      this.emitSelection(this.windowState)
    }
  }

}
