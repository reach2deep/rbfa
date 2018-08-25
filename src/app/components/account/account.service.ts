import { Account } from './account.model';

import { AppConfig } from './../../config/app.config';
import { throwError } from 'rxjs/internal/observable/throwError';


import {Observable, of, throwError as observableThrowError, Subject, BehaviorSubject} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';

import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import * as _ from 'lodash';
import { catchError, tap, map } from 'rxjs/operators';
import { Api } from '../../core/common/api';
import { LoggerService } from '../../core/common/logger.service';
import * as goog from 'goog';
import { Page, PagedData } from '../transaction/transaction.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class AccountService {

  constructor(private snackBar: MatSnackBar,
    public api: Api) {}


  public getAllAccounts(filter = '', sortOrder = 'asc', pageNumber = 0, pageSize = 3): Observable <PagedData<Account>> {
    return this.api
      .get('/account',
        new HttpParams()
        .set('courseId', '111')
        .set('filter', filter)
        .set('sortOrder', sortOrder)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())

      )
      .pipe(
        map((res: any) => {
          //  console.log(res);
          const pagedData = new PagedData<Account>();
          const page = new Page();
          page.size = pageSize;
          page.pageNumber = pageNumber;
          page.totalElements = res['totalElements'];
          page.totalPages = res['totalPages'];
          const start = res['totalPages'];
          const end = res['end'];
          pagedData.data = res['data'];
          pagedData.page = page;
          console.log(pagedData);
          return pagedData;
        })
      );
  }

  getAccountById(id: string) {
    const url = `${AppConfig.endpoints.account}/${id}`;
    return this.api.get(url).pipe(
      tap((account: Account) => LoggerService.log('fetched Account id' + JSON.stringify(account)),
        catchError(this.handleError('getAccountById'))
      ));
  }

  createAccount(newAccount: Account): Observable<Account> {
    return this.api.post(AppConfig.endpoints.account, JSON.stringify({
      accountName: newAccount.accountName,
      description: newAccount.description,
      amount: newAccount.amount,
      transactionDate: newAccount.transactionDate
    }), httpOptions).pipe(
      tap((AccountSaved: Account) => {
        LoggerService.log(`added Account w/ id=${AccountSaved.id}`);
        this.showSnackBar('Paye Account');
      }),
      catchError(this.handleError<Account>('createAccount'))
    );
  }

  updateAccountById(updateAccount: Account): Observable<Account> {
    console.log('updateAccountById' + JSON.stringify(updateAccount['_id']));
    const url = `${AppConfig.endpoints.payee}/${updateAccount['_id']}`;

    return this.api.put(url, JSON.stringify({
      accountName: updateAccount.accountName,
      description: updateAccount.description,
      amount: updateAccount.amount,
      transactionDate: updateAccount.transactionDate
    }), httpOptions).pipe(
      tap((AccountSaved: Account) => {
        LoggerService.log(`updated Account w/ id=${AccountSaved}`);
        this.showSnackBar('Account update');
      }),
      catchError(this.handleError<Account>('updateAccountById'))
    );
  }

  showSnackBar(name): void {
    const config: any = new MatSnackBarConfig();
    config.duration = AppConfig.snackBarDuration;
    this.snackBar.open(name, 'OK', config);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      LoggerService.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
