import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ChangeDetectorRef
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AutoCompleteComponent } from '@progress/kendo-angular-dropdowns';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './app-autocomplete.html',
  styleUrls: ['./app-autocomplete.scss']
})
export class AppAutoCompleteComponent implements OnInit {
  listItems: Array<string>;
  allItems: Array<string>;
  textValue: string;
  _cacheKey: string;
  debounceEvent = new Subject<string>();
  isShowNoData = true;

  get cacheKey() {
    return this._cacheKey;
  }

  @ViewChild('storageAutoComplete', { static: false })
  public storageAutoComplete: any;

  @Input() thePlaceholder: String;

  @Input() minimumFilterLength: number;

  @Input() set cacheKey(value) {
    this._cacheKey = value;
    if (value !== '') {
      this.handleGetAutoComplete();
    }
  }

  @Input() debounceTimeMS: number;

  @Input() minCharacterSaveLength: number;

  @Output() updateNoteChanged = new EventEmitter<String>();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.handleGetAutoComplete();
    this.debounceEvent
      .pipe(
        debounceTime(this.debounceTimeMS),
        distinctUntilChanged()
      )
      .subscribe(val => {
        this.textValue = val;
        this.handleSetAutoComplete();
      });
  }

  private handleSetAutoComplete() {
    if (this.textValue !== undefined) {
      if (
        this.cacheKey !== '' &&
        this.textValue.trim().length >= this.minCharacterSaveLength
      ) {
        this.addValueToCache();
      }
    }
  }

  private addValueToCache() {
    const localCacheValue = localStorage.getItem(this.cacheKey);
    const autoCompleteValues: Array<string> =
      localCacheValue === null ? [] : JSON.parse(localCacheValue);
    if (autoCompleteValues.indexOf(this.textValue)) {
      autoCompleteValues.push(this.textValue);
    }
    localStorage.setItem(this.cacheKey, JSON.stringify(autoCompleteValues));
    this.handleGetAutoComplete();

    this.cdr.detectChanges();
    this.filterChange(this.textValue);
  }

  private handleGetAutoComplete() {
    localStorage.getItem(this.cacheKey) === null
      ? (this.listItems = [])
      : this.filterWhitespaces();
    this.allItems = this.listItems;
  }

  private filterWhitespaces() {
    const cacheValues = JSON.parse(localStorage.getItem(this.cacheKey));
    const trimmedValues = [];
    for (let t = 0; t < cacheValues.length; t++) {
      trimmedValues.push(cacheValues[t].trim());
    }
    this.listItems = trimmedValues;
  }

  public filterChange(filter: string) {
    if (filter.length >= this.minimumFilterLength) {
      this.listItems = this.allItems.filter(
        s => s.toLowerCase().indexOf(filter.toLowerCase().trim()) !== -1
      );
      if (!this.isShowNoData && this.listItems.length === 0) {
        this.listItems = [''];
      }
    } else {
      this.storageAutoComplete.toggle(false);
    }
    this.updateNoteChanged.emit(filter.trim());
    this.textValue = filter.trim();
    this.debounceEvent.next(filter.trim());
  }

  public reset() {
    this.storageAutoComplete.reset();
    this.textValue = '';
  }

  valueChangeHandler() {
    this.updateNoteChanged.emit(this.textValue);
  }
}
