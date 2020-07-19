import { IListMode } from './window.enums';

export class WindowState {
  mode : IListMode = IListMode.select;
  selectedRow: string;
  params: any;
  dialogComponent: string;
}
