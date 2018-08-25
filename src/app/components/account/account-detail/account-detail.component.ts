import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Account } from './../account.model';
import { Component, OnInit, ViewChild } from "@angular/core";
import { AccountService } from '../account.service';
import { SnotifyService } from '../../../../../node_modules/ng-snotify';
import * as moment from 'moment';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})

export class AccountDetailComponent implements OnInit {

  isNumPadVisible = false;
  mode: String = 'New';
  transaction: Account;
  newTransactionForm: FormGroup;
  @ViewChild('form') myNgForm; // just to call resetForm method

  transactionType: string;
  filesToUpload: Array<File> = [];
imageSrc: any;
  constructor(private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private snotifyService: SnotifyService,
    private activatedRoute: ActivatedRoute,
    public dialogRef: MatDialogRef<AccountDetailComponent>

  ) {

        this.transaction = new Account();
        this.newTransactionForm = this.formBuilder.group({
        'accountName': new FormControl('', [Validators.required]),
        'amount': new FormControl('', [Validators.required]),
        'description': new FormControl('', [Validators.required]),
        'transactionDate': new FormControl('', [Validators.required])
      });

    }

  ngOnInit() {

    const transactionId = this.activatedRoute.snapshot.paramMap.get('id');
    if (transactionId) {
    this.accountService.getAccountById(transactionId).subscribe((transaction: Account) => {
      this.mode = 'Edit';
      this.transaction = transaction;
      console.log(JSON.stringify(this.transaction));
    });
  }

  this.transaction.transactionDate = moment().toDate();
  }

  createNewTransaction(newTransaction: Account) {

     const transDateTime = new Date(moment(this.transaction.transactionDate).format('YYYY-MM-DD ')
                                        + moment().format('HH:mm'));
     newTransaction.transactionDate = transDateTime;

    console.log('transaction ' + JSON.stringify(this.transaction));
    console.log('newTransaction ' + JSON.stringify(newTransaction));

     this.saveTransaction(newTransaction);

  }

  saveTransaction(transaction) {

    this.accountService.createAccount(transaction).subscribe((newTransactionWithId) => {
      this.myNgForm.resetForm();
      this.dialogRef.close();
    }, (response: Response) => {
      if (response.status === 500) {
       // this.error = 'errorHasOcurred';
      }
    });
  }


  toggleNumberView() {
    this.isNumPadVisible = this.isNumPadVisible === true ? false : true;
  }



  onAmountSelected(selectedNumber) {
    console.log('selectedNumber ' + selectedNumber);
    this.transaction.amount = selectedNumber;
    this.toggleNumberView();
  }
}

