import { Page } from './../../transaction/transaction.model';
import { AppConfig } from './../../../config/app.config';
import { AccountService } from './../account.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Account } from './../account.model';
import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '../../../../../node_modules/@angular/material';
import { AccountDetailComponent } from '../account-detail/account-detail.component';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})

export class AccountListComponent implements OnInit {

  page = new Page();
  rows = new Array<Account>();
  transactionType: string;

  constructor(private router: Router
    , private route: ActivatedRoute
    , private accountService: AccountService
    , private dialog: MatDialog) {

      this.page.pageNumber = 0;
      this.page.size = 10;
  }


  ngOnInit() {

    this.setPage({ offset: 0 });

}

setPage(pageInfo) {
  this.page.pageNumber = pageInfo.offset;
  this.accountService.getAllAccounts('', 'asc', this.page.pageNumber , this.page.size).subscribe(pagedData => {
    this.page = pagedData.page;
    this.rows = pagedData.data;
  });
}

createNewItem() {

    // this.router.navigate([AppConfig.routes.account + '/new']);

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    const matdialog = this.dialog.open(AccountDetailComponent, dialogConfig);

    matdialog.afterClosed()
      .subscribe(selection => {
        this.setPage({ offset: 0 });
      });

}

viewDetail(id): void {
  console.log(id);
  if (id) {
    console.log('routing ' + [AppConfig.routes.account + '/' + id]);
    this.router.navigate([AppConfig.routes.account + '/' + id]);
  }
}
}
