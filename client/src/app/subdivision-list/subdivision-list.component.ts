import { Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output, Provider } from '@angular/core';
import { Subscription } from 'rxjs';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {CollectionViewer, SelectionChange, DataSource} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {Injectable} from '@angular/core';
import {BehaviorSubject, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import { WindowState } from '../shared/window';
import { IListMode } from '../shared/window.enums';
import { ISubdivision } from '../../../../src/subdivision/interfaces/subdivision.interface';
import { CatalogsService } from '../services/catalog.service';



const VALUE_ACCESOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef( () => SubdivisionListComponent),
  multi: true
}

/** Flat node with expandable and level information */
export class DynamicFlatNode {
  constructor(public item: ISubdivision, public level = 1, public expandable = false,
              public isLoading = false) {}
}

export class DynamicDataSource implements DataSource<DynamicFlatNode> {

  dataChange = new BehaviorSubject<DynamicFlatNode[]>([]);

  get data(): DynamicFlatNode[] { return this.dataChange.value; }
  set data(value: DynamicFlatNode[]) {
    this._treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  constructor(private _treeControl: FlatTreeControl<DynamicFlatNode>,
              private _database: CatalogsService) {}

  connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
    this._treeControl.expansionModel.changed.subscribe(change => {
      if ((change as SelectionChange<DynamicFlatNode>).added ||
        (change as SelectionChange<DynamicFlatNode>).removed) {
        this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  disconnect(collectionViewer: CollectionViewer): void {}

  /** Handle expand/collapse behaviors */
  handleTreeControl(change: SelectionChange<DynamicFlatNode>) {
    if (change.added) {
      change.added.forEach(node => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed.slice().reverse().forEach(node => this.toggleNode(node, false));
    }
  }

  /**
   * Toggle the node, remove from display list
   */
  toggleNode(node: DynamicFlatNode, expand: boolean) {
    let children : ISubdivision[] = [];


    this._database.getSubdivisionByOrganizationAndParent(node.item.organization_pk, node.item.pk).subscribe(subdivisionList => {
        children = subdivisionList
    })

    const index = this.data.indexOf(node);
    if (!children || index < 0) { // If no children, or cannot find the node, no op
      return;
    }

    node.isLoading = true;

    setTimeout(() => {
      if (expand) {
        const nodes: DynamicFlatNode[] = []

        for (const sub of children){
          const dynamicFlatNode = new DynamicFlatNode(sub, 1,sub.hasChild, false)
          nodes.push(dynamicFlatNode)
        }

        this.data.splice(index + 1, 0, ...nodes);
      } else {
        let count = 0;
        for (let i = index + 1; i < this.data.length
        && this.data[i].level > node.level; i++, count++) {}
        this.data.splice(index + 1, count);
      }

      // notify the change
      this.dataChange.next(this.data);
      node.isLoading = false;
   }, 500);
  }
}


@Component({
  selector: 'app-subdivision-list',
  templateUrl: './subdivision-list.component.html',
  styleUrls: ['./subdivision-list.component.scss'],
  providers: [VALUE_ACCESOR]
})
export class SubdivisionListComponent implements  OnInit, OnDestroy {

  @Input()
  public windowState: WindowState
  @Output()
  private outputWindowState = new EventEmitter()

  private pSub: Subscription;
  public title =  ''
  public subdivisionList: ISubdivision[];
  public selectedRow: null

  treeControl: FlatTreeControl<DynamicFlatNode>;
  dataSource: DynamicDataSource;
  getLevel = (node: DynamicFlatNode) => node.level;
  isExpandable = (node: DynamicFlatNode) => node.expandable;
  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;

  constructor(private catalogsService: CatalogsService) {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, catalogsService);
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
  }

  select(pk){
    this.selectedRow = pk
  }


  ngOnInit() {
      this.catalogsService.getSubdivisionByOrganizationAndParent(this.windowState.params.organizationPk, '').subscribe(subdivisionList => {
        this.subdivisionList = subdivisionList;

        const nodes: DynamicFlatNode[] = []

        for (const sub of this.subdivisionList) {
          const dynamicFlatNode = new DynamicFlatNode(sub, 1, sub.hasChild, false)
          nodes.push(dynamicFlatNode)
        }

        this.dataSource.data = nodes;
      })
  }


  selectElement(node: any) {
      if (this.windowState.mode = IListMode.view) {
        this.windowState.selectedRow = node.item.pk
        this.windowState.params = {...this.windowState.params, selectedRowItem: node.item}
        this.onChange(this.windowState)
      }
  }

  actionSelect() {
    const element = this.subdivisionList.find( el => el.pk === this.selectedRow )
    this.windowState.selectedRow = element.pk
    this.windowState.params = {...this.windowState.params, selectedRowItem: element}
    this.onChange(this.windowState)
  }

  actionCansel() {
    this.onChange(null)
  }

  onChange(windowState: WindowState){
    this.outputWindowState.emit(windowState)
  }

}

