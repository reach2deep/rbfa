import { AppConfig } from './../../config/app.config';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map} from 'rxjs/operators';
import { Transaction } from './transaction.model';

@Injectable()
export class TransactionResolver implements Resolve<Transaction[]> {

    constructor(private http: HttpClient) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<Transaction[]> {
        return this.http.get(AppConfig.endpoints.transactions)
            .pipe(map(res => res['transactions']));
    }

}
