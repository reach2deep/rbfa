import { AppConfig } from './../../../config/app.config';
import { TransactionService } from './../transaction.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction, Category, Page } from '../transaction.model';
import { Observable, ReplaySubject } from '../../../../../node_modules/rxjs';
import { TransactionsDataSource } from '../transaction.datasource';
import { MatPaginator, MatSort, MatTableDataSource } from '../../../../../node_modules/@angular/material';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import {merge} from 'rxjs/observable/merge';
import {fromEvent} from 'rxjs/observable/fromEvent';
import {debounceTime, distinctUntilChanged, startWith, tap, delay} from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})

export class TransactionListComponent implements OnInit {

  page = new Page();
  rows = new Array<Transaction>();
  transactionType: string;

  constructor(private router: Router
    , private route: ActivatedRoute
    , private http: HttpClient
    , private transactionService: TransactionService) {

      this.page.pageNumber = 0;
      this.page.size = 10;
  }


  ngOnInit() {

    this.setPage({ offset: 0 });

}

setPage(pageInfo) {
  this.page.pageNumber = pageInfo.offset;
  this.transactionService.getResults('', 'asc', this.page.pageNumber , this.page.size).subscribe(pagedData => {
    this.page = pagedData.page;
    this.rows = pagedData.data;
  });
}

onRowClicked(row) {
    console.log('Row clicked: ', row);
}

createNewItem(item) {
  console.log('createNewItem ' + item);
  if (item) {
    console.log(AppConfig.routes.transactions + '/new');
    this.router.navigate([AppConfig.routes.transactions + '/new'], { queryParams: { transactionType: item } });
  }
}

viewDetail(id): void {
  console.log(id);
  if (id) {
    console.log('routing ' + [AppConfig.routes.transactions + '/' + id]);
    this.router.navigate([AppConfig.routes.transactions + '/' + id]);
  }
}


  testHttp() {
    this.http.get('https://reqres.in/api/users?delay=2').subscribe(res => {
      console.log(res);
      setTimeout(() => {
      }, 800);
    });
  }
}
