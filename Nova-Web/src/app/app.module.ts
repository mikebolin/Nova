import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DialogModule, WindowModule } from '@progress/kendo-angular-dialog';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { UploadModule } from '@progress/kendo-angular-upload';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { PopupModule } from '@progress/kendo-angular-popup';
import { ContextMenuModule } from '@progress/kendo-angular-menu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActivityGridComponent } from './components/activity-grid/activity-grid.component';
import { HeaderMenuComponent } from './shared/header-menu/header-menu.component';
import { LogPageComponent } from './pages/logs/log-page.component';
import { GridSearchComponent } from './components/grid-search/grid-search.component';
import { AppAutoCompleteComponent } from '../app/shared/autocomplete/app-autocomplete';
import { MultiCheckFilterComponent } from '../app/shared/multicheck-filter.component';
import {
  TabStripComponent,
  TabStripTabComponent
} from '@progress/kendo-angular-layout';
import { DateRangeFilterCellComponent } from '../app/shared/date-range-cell-filter.component';

import { LogService } from './services/logs.service';
import { StartupService } from './services/startup.service';

@NgModule({
  declarations: [
    AppComponent,
    AppAutoCompleteComponent,
    HeaderMenuComponent,
    LogPageComponent,
    ActivityGridComponent,
    GridSearchComponent,
    MultiCheckFilterComponent,
    DateRangeFilterCellComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LayoutModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DateInputsModule,
    GridModule,
    DropDownsModule,
    DialogModule,
    WindowModule,
    InputsModule,
    UploadModule,
    TreeViewModule,
    ButtonsModule,
    PopupModule,
    ContextMenuModule
  ],
  providers: [StartupService, LogService],
  entryComponents: [TabStripComponent, TabStripTabComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
