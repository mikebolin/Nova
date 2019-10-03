import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Observable, Subject, throwError as observableThrowError } from 'rxjs';

@Injectable()
export class StartupService {
  constructor() {}

  get NovaAPIUrl(): string {
    return 'http://localhost:53080/api/';
  }

  get BlueShipAPIURL(): string {
    return 'https://blueship-api-log.azurewebsites.net/api/';
  }
}
