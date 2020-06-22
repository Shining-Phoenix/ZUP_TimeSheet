import { IEmployeeListMode } from './window.enums';

export class WindowState {
  mode : IEmployeeListMode = IEmployeeListMode.select;
  selectedRow: string
}
