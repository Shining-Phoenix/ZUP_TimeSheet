import { Component, forwardRef, OnDestroy, OnInit, Provider } from '@angular/core';
import { Subscription } from 'rxjs';

import { EmployeeService } from '../services/employee.service';
import { IEmployeeList } from '../../../../src/employee/interfaces/employeeList.dto';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { WindowState } from '../shared/window';
import { IListMode } from '../shared/window.enums';

const VALUE_ACCESOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef( () => EmployeeListComponent),
  multi: true
}

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  providers: [VALUE_ACCESOR]
})
export class EmployeeListComponent implements ControlValueAccessor, OnInit, OnDestroy {

  private pSub: Subscription;
  private onChange = (value : any) => {}
  public windowState: WindowState
  public selectedEmployee: string;
  public employeeList: IEmployeeList[];

  constructor(
    private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getEmployeeListForKeeper().subscribe(employeeList => {
      this.employeeList = employeeList;
    })

  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
  }

  selectEmployee (employee: IEmployeeList){
    if (this.windowState.mode = IListMode.view) {
      this.windowState.selectedRow = employee.pk
    } else {
      this.onChange(this.windowState)
    }
  }


  select(pk: string){
    this.windowState = {...this.windowState, selectedRow: pk}
  }

  hideWindow() {
    this.windowState = {...this.windowState, selectedRow: undefined}
  }

  activateEmployee (pk: string){
    this.selectedEmployee = pk
  }



  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(windowState: WindowState): void {
    this.windowState = windowState
  }
}
