import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import { Router } from '@angular/router';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { of } from 'rxjs/observable/of';
import { Search } from 'src/app/models/searchObject';
import { Observable, Subject, throwError as observableThrowError } from 'rxjs';
@Component({
  selector: 'app-grid-search',
  templateUrl: './grid-search.component.html',
  styleUrls: ['./grid-search.component.scss']
})
export class GridSearchComponent implements OnInit {
  isDateSearch: boolean;
  show = false;
  opened = false;
  selectedSegment;
  range = { start: null, end: null };
  toggleText: String;
  messageTypeItems: Array<string> = [];
  messageTypeValue: any = [];
  titleText: String = '';
  switchText: String = '';
  selectedIdentifier: string;
  selectedUser: string;
  selectedEnterprise: string;
  selectedApplication: string;
  selectedIdentifierValue: string;
  public searchByItems: any[] = [
    { text: 'Identifier Search' },
    { text: 'Date Search' }
  ];
  public defaultItem: { text: string; value: number; isEnabled: boolean } = {
    text: 'Select Identifier...',
    value: null,
    isEnabled: false
  };

  public identifierItems: Array<{
    text: string;
    value: number;
    isEnabled: boolean;
  }> = [
    { text: 'Primary Reference', value: 1, isEnabled: true },
    { text: 'Shipment ID', value: 2, isEnabled: true },
    { text: 'Correlation ID', value: 3, isEnabled: true }
  ];

  public get animate(): any {
    if (this.show) {
      return {
        type: this.animation,
        direction: this.direction,
        duration: this.durationMS
      };
    }
    return false;
  }

  @Input() animation: String;
  @Input() direction: String;
  @Input() durationMS: Number;
  @Input() showButtonText: String;
  @Input() hideButtonText: String;
  @Output() toggledFitler = new EventEmitter<boolean>();
  @Output() searchEvent = new EventEmitter<Search>();

  constructor() {}
  ngOnInit() {
    this.init();
  }

  init() {
    this.show = true;
    this.isDateSearch = true;
    this.setTextValues();
    this.toggleText = this.showButtonText;
  }
  public onToggle(): void {
    this.show = !this.show;
    this.toggleText = this.show ? this.hideButtonText : this.showButtonText;
    this.toggledFitler.emit(this.show);
  }

  public onSearch() {
    console.log(this.buildGridSearch());
    this.searchEvent.emit(this.buildGridSearch()); //this.buildGridSearch());
    this.show = false;
  }

  public close() {
    this.opened = false;
  }
  public open() {
    this.opened = true;
  }
  closeFilters() {
    this.close();
    this.onToggle();
  }
  clearFilters() {
    this.closeFilters();
  }
  public valueChange(value: any): void {
    this.selectedIdentifier = value;
  }
  public selectionChange(value: any): void {
    this.selectedIdentifier = value;
  }
  onItemClick(event) {
    this.isDateSearch = event.text === 'Date Search';
    this.titleText = event.text;
    this.setTextValues();
    this.onToggle();
  }
  switchSearch() {
    this.isDateSearch = !this.isDateSearch;
    this.setTextValues();
  }

  setTextValues() {
    this.isDateSearch
      ? ((this.switchText = 'Identifier'), (this.titleText = 'Date Search'))
      : ((this.switchText = 'Date'), (this.titleText = 'Identifier Search'));
  }

  public itemDisabled(itemArgs: { dataItem: any; index: number }) {
    return !itemArgs.dataItem.isEnabled;
  }
  buildGridSearch() {
    const gridSearchResult = new Search();
    gridSearchResult.isDateSearch = this.isDateSearch;
    gridSearchResult.startDate = this.range.start;
    gridSearchResult.endDate = this.range.end;
    gridSearchResult.user = this.selectedUser;
    gridSearchResult.enterprise = this.selectedEnterprise;
    gridSearchResult.application = this.selectedApplication;
    gridSearchResult.messageType = this.messageTypeValue;
    gridSearchResult.identifierType = this.selectedIdentifier;
    gridSearchResult.identifierValue = this.selectedIdentifierValue;
    return gridSearchResult;
  }
  public changeEnviornment() {
    this.init();
  }
}
