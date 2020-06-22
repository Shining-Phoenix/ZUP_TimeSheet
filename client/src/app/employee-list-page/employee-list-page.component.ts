import { Component } from '@angular/core';
import { WindowState } from '../shared/window';
import { IEmployeeListMode } from '../shared/window.enums';

@Component({
  selector: 'app-employee-list-page',
  templateUrl: './employee-list-page.component.html',
  styleUrls: ['./employee-list-page.component.scss']
})
export class EmployeeListPageComponent {

  public windowState: WindowState = {
    mode: IEmployeeListMode.view,
    selectedRow: null
  }
}
