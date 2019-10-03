import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, Subject, throwError as observableThrowError } from 'rxjs';
import 'rxjs/add/operator/map';
import { catchError } from 'rxjs/operators';
import { StartupService } from './startup.service';
import { Search } from '../models/searchObject';

@Injectable()
export class LogService {
  constructor(
    private http: HttpClient,
    private startupService: StartupService
  ) {}

  public getLogForDateSearch(searchVals: Search): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.startupService.BlueShipAPIURL}/Request?environment=${searchVals.enviornment}
      &startDate=${searchVals.startDate}
      &endDate=${searchVals.endDate}
      &userName=${searchVals.user}
      &enterpriseID=${searchVals.enterprise}
      &applicationName=${searchVals.application}`
    );
  }

  public getLogForIdentifierSearch(searchVals: Search): Observable<any[]> {
    switch (searchVals.identifierType) {
      case 'Primary Reference':
        console.log('prim reference case');
        return this.getLogForPrimaryRef(searchVals);
        break;
      case 'Shipment ID':
        console.log('shipment id case');
        return this.getLogForShipmentID(searchVals);
        break;
      case 'Correlation ID':
        console.log('correlation id case');
        return this.getLogForCorrelationID(searchVals);
        break;
      default:
    }
  }

  public getLogForPrimaryRef(searchVals: Search): Observable<any[]> {
    return this.http
      .get<any[]>(
        `${this.startupService.BlueShipAPIURL}/Request?environment=${searchVals.enviornment}
      &primaryReference=${searchVals.identifierValue}`
      )
      .pipe(catchError(this.handleError));
  }
  public getLogForShipmentID(searchVals: Search): Observable<any[]> {
    return this.http
      .get<any[]>(
        `${this.startupService.BlueShipAPIURL}/Request?environment=${searchVals.enviornment}
      &shipmentID=${searchVals.identifierValue}`
      )
      .pipe(catchError(this.handleError));
  }
  public getLogForCorrelationID(searchVals: Search): Observable<any[]> {
    return this.http
      .get<any[]>(
        `${this.startupService.BlueShipAPIURL}/Request?environment=${searchVals.enviornment}
      &correlationID=${searchVals.identifierValue}`
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(res: HttpErrorResponse) {
    console.log(res.error);
    return observableThrowError(res.error || 'Server error');
  }
}
