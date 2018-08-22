import { TransactionService } from './transaction.service';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {catchError, finalize} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import { Transaction } from './transaction.model';



export class TransactionsDataSource implements DataSource<Transaction> {

    private transactionListSubject = new BehaviorSubject<Transaction[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();
    constructor(private transactionService: TransactionService) { }

    loadAllTransactions(filter: string, sortDirection: string, pageIndex: number, pageSize: number) {

        this.loadingSubject.next(true);
        this.transactionService.getTransactionsList(filter, sortDirection,
            pageIndex, pageSize).pipe(
                catchError(
                    () => of([])
                ),
                finalize(
                    () => this.loadingSubject.next(false))
                )
            .subscribe(
                lessons => {
                    console.log(lessons);
                    this.transactionListSubject.next(lessons);
                }
            );
    }

    connect(collectionViewer: CollectionViewer): Observable<Transaction[]> {
        console.log('Connecting data source');
        return this.transactionListSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.transactionListSubject.complete();
        this.loadingSubject.complete();
    }

}
