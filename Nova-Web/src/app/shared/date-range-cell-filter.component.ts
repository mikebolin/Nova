import { Component, Input } from '@angular/core';
import {
  BaseFilterCellComponent,
  FilterService
} from '@progress/kendo-angular-grid';
import {
  FilterDescriptor,
  CompositeFilterDescriptor
} from '@progress/kendo-data-query/dist/es/main';

@Component({
  selector: 'date-range-filter-cell',
  styles: [
    `
      kendo-daterange > kendo-dateinput.range-filter {
        display: inline-block;
      }
      .k-button {
        margin-left: 5px;
      }
    `
  ],
  template: `
    <kendo-daterange>
      <kendo-dateinput
        class="range-filter"
        kendoDateRangeStartInput
        [value]="start"
        (valueChange)="filterRange($event, end)"
        style="width:120px"
      >
      </kendo-dateinput>
      -
      <kendo-dateinput
        class="range-filter"
        kendoDateRangeEndInput
        [value]="end"
        (valueChange)="filterRange(start, $event)"
        style="width:120px"
      >
      </kendo-dateinput>
    </kendo-daterange>
    <button
      *ngIf="hasFilter"
      class="k-button k-button-icon"
      title="Clear"
      (click)="clearFilter()"
    >
      <span class="k-icon k-i-filter-clear"></span>
    </button>
  `
})
export class DateRangeFilterCellComponent extends BaseFilterCellComponent {
  @Input()
  public filter: CompositeFilterDescriptor;

  @Input()
  public field: string;

  constructor(filterService: FilterService) {
    super(filterService);
  }

  public get start(): Date {
    const first = this.findByOperator('gte');

    return (first || <FilterDescriptor>{}).value;
  }

  public get end(): Date {
    const end = this.findByOperator('lte');
    return (end || <FilterDescriptor>{}).value;
  }

  public get hasFilter(): boolean {
    return this.filtersByField(this.field).length > 0;
  }

  public clearFilter(): void {
    this.filterService.filter(this.removeFilter(this.field));
  }

  public filterRange(start: Date, end: Date): void {
    this.filter = this.removeFilter(this.field);

    const filters = [];

    if (start) {
      filters.push({
        field: this.field,
        operator: 'gte',
        value: start
      });
    }

    if (end) {
      filters.push({
        field: this.field,
        operator: 'lte',
        value: end
      });
    }

    const root = this.filter || {
      logic: 'and',
      filters: []
    };

    if (filters.length) {
      root.filters.push(...filters);
    }

    this.filterService.filter(root);
  }

  private findByOperator(op: string): FilterDescriptor {
    return this.filtersByField(this.field).filter(
      ({ operator }) => operator === op
    )[0];
  }
}
