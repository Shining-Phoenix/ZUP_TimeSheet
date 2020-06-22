import { Component, forwardRef, Provider } from '@angular/core';

import { IEmployeeList } from '../../../../src/employee/interfaces/employeeList.dto';
import { EmployeeService } from '../services/employee.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const VALUE_ACCESOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef( () => EmployeeComponent),
  multi: true
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  providers: [VALUE_ACCESOR]
})
export class EmployeeComponent implements ControlValueAccessor{

  private pk: string
  private onChange = (value : any) => {}
  public employee: IEmployeeList

  constructor(
    private employeeService: EmployeeService) {
  }

  fetchEmployee(pk: string) {
    this.employeeService.getEmployeeListById(pk).subscribe(employee => {
      this.employee = employee
    })
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(pk: string): void {
    this.pk = pk
    this.pk && this.fetchEmployee(this.pk)
  }

}
