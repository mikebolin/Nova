import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Router } from '@angular/router';
import {
  PageChangeEvent,
  GridDataResult,
  SelectableSettings,
  DataStateChangeEvent,
  RowClassArgs
} from '@progress/kendo-angular-grid';

import {
  filterBy,
  FilterDescriptor,
  CompositeFilterDescriptor,
  distinct,
  SortDescriptor,
  orderBy
} from '@progress/kendo-data-query';
import { ActivityLogResponse } from '../../models/activityLogResponse';
import { FilterService } from '@progress/kendo-angular-grid';
import { dumnmydata } from './../../models/dummyData';
import { Observable, Subject, throwError as observableThrowError } from 'rxjs';
@Component({
  selector: 'app-activity-grid',
  templateUrl: './activity-grid.component.html',
  styleUrls: ['./activity-grid.component.scss']
})
export class ActivityGridComponent implements OnInit {
  get theRecords(): any[] {
    return this.gridDataAll;
  }

  @Input('theRecords')
  set theRecords(value: any[]) {
    this.gridDataAll = value;
    this.gridDataCurrent = value;
    this.loadRecords();
  }

  @Output()
  selectedrecords = new EventEmitter<string[]>();
  public filter: CompositeFilterDescriptor;
  gridDataAll: any[];
  gridDataCurrent: any[];
  gridData: GridDataResult;
  range = { start: null, end: null };
  public statusCategories: any[];
  public pageSize = 100;
  public skip = 0;
  public view = new Array(this.pageSize).fill({}).map(x => ({}));
  public sort: SortDescriptor[] = [];
  public filterChange(filter: CompositeFilterDescriptor): void {
    this.filter = filter;
    this.gridDataCurrent = filterBy(this.gridDataAll, filter);
    this.loadRecords();
  }

  public distinctPrimitive(fieldName: string): any {
    return distinct(this.gridDataAll, fieldName).map(item => item[fieldName]);
  }

  constructor() {}

  ngOnInit() {
    this.loadRecords();
  }

  public rowCallback(context: RowClassArgs) {
    const isEven = context.index % 2 === 0;
    return {
      even: isEven,
      odd: !isEven
    };
  }
  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.pageSize = event.take;
    this.loadRecords();
  }

  private loadRecords(): void {
    const currentView = this.gridDataCurrent.slice(
      this.skip,
      this.skip + this.pageSize
    );

    const removeCount = this.view.length - currentView.length;

    if (removeCount > 0) {
      this.view.splice(currentView.length - 1, removeCount);
    }

    currentView.forEach((item, index) => {
      if (!this.view[index]) {
        this.view[index] = {};
      }
      Object.assign(this.view[index], item);
    });
    this.view = orderBy(this.view, this.sort);
    this.gridData = {
      data: this.view,
      total: this.gridDataCurrent.length
    };
  }

  protected sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.loadRecords();
  }
}
