import {Component, Inject} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { WindowState } from '../shared/window';
import { IListMode } from '../shared/window.enums';

@Component({
  selector: 'app-subdivision-select-dialog',
  templateUrl: './subdivision-select-dialog.component.html',
  styleUrls: ['./subdivision-select-dialog.component.scss']
})
export class SubdivisionSelectDialogComponent  {

  public subdivisionWindowState = <WindowState>{}

  constructor(
    public dialogRef: MatDialogRef<SubdivisionSelectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WindowState) {
    this.subdivisionWindowState =  {
      mode: IListMode.select,
      selectedRow: data.params.selectedRow,
      params: {organizationPk: data.params.organizationPk}
    }
  }

  onSelect(event: WindowState) {
    this.dialogRef.close(event);
  }
}
