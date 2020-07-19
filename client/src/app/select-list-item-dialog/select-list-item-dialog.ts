import {
  Component,
  ComponentFactoryResolver, ComponentRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { WindowState } from '../shared/window';
import { IListMode } from '../shared/window.enums';
import { SubdivisionListComponent } from '../subdivision-list/subdivision-list.component';

@Component({
  selector: 'app-select-list-item-dialog',
  templateUrl: './select-list-item-dialog.html',
  styleUrls: ['./select-list-item-dialog.component.scss']
})
export class SelectListItemDialogComponent  implements OnInit, OnDestroy{

  @ViewChild("listComponent", {static: true, read: ViewContainerRef}) container;
  public windowState = <WindowState>{}
  private componentRef: ComponentRef<any>

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    public dialogRef: MatDialogRef<SelectListItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WindowState) {
    this.windowState =  {
      mode: IListMode.select,
      selectedRow: data.params.selectedRow,
      params: {organizationPk: data.params.organizationPk},
      dialogComponent: data.dialogComponent
    }
  }

  onSelect(event: WindowState) {
    this.dialogRef.close(event);
  }

  ngOnInit() {
    this.container.clear();
    const component = this.getComponentByName(this.windowState.dialogComponent);
    const factory = this.componentFactoryResolver.resolveComponentFactory(component);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.windowState = this.windowState
    this.componentRef.instance.outputWindowState.subscribe(event => this.onSelect(event))
  }

  ngOnDestroy(){
    this.componentRef.destroy()
  }

  getComponentByName(componentName: string){

    switch (componentName) {
      case 'SubdivisionListComponent': return SubdivisionListComponent
      default: throw 'Unknown component'
    }

  }
}
