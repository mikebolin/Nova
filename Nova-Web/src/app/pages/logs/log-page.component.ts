import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  Directive,
  Optional,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import {
  Observable,
  Subject,
  throwError as observableThrowError,
  Subscription
} from 'rxjs';
import { Router } from '@angular/router';
import { GridSearchComponent } from '../../components/grid-search/grid-search.component';
import { TabContentLoadOnDemandDirective } from '../../shared/lazyload.directive';
import { ActivityLogResponse } from '../../models/activityLogResponse';
import { dumnmydata } from '../../models/dummyData';
import { LogService } from '../../services/logs.service';
import { Search } from 'src/app/models/searchObject';
@Component({
  selector: 'app-activity-log',
  templateUrl: './log-page.component.html',
  styleUrls: ['./log-page.component.scss']
})
export class LogPageComponent implements OnInit {
  @ViewChild('gridFilters', { static: false })
  gridFilter: GridSearchComponent;

  gridLoaded: boolean = false;
  CurrentTab: String;
  public opened = false;
  public dataSaved = false;
  public selectedEnv = 'PROD';
  public enviornmentItems: Array<string> = ['DEV', 'PROD', 'QA'];
  isGridFilterToggled: boolean = true;
  gridData: any[] = [];

  constructor(private logService: LogService) {}

  ngOnInit() {
    this.CurrentTab = 'Activity Log';
    this.init();
  }

  init() {
    this.getRecords();
  }

  getRecords() {}

  public onTabSelect(e) {}

  gridFiltersToggled(event) {
    this.isGridFilterToggled = event;
  }

  searchGridData(event): void {
    /*
    console.log(event);
    this.logService
      .getLogForIdentifierSearch(event)
      .subscribe(heroes => console.log(heroes));
  }
*/
    /*
      this.logService.getLogForIdentifierSearch(event).subscribe(res => {
        console.log('getting response ', res);
  
      });
      */
    this.gridLoaded = true;
    this.isGridFilterToggled = false;
    this.gridData = dumnmydata;
  }

  public valueChange(value: any): void {
    this.selectedEnv = value;
  }
  public selectionChange(value: any): void {
    this.selectedEnv = value;
    this.gridData = [];
    this.gridLoaded = false;
    this.gridFilter.changeEnviornment();
  }
}
