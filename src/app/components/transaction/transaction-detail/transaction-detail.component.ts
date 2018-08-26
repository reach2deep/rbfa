import { AppConfig } from './../../../config/app.config';
import { TransactionService } from './../transaction.service';
import { Transaction } from './../transaction.model';
import * as moment from 'moment';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Component, OnInit, ViewChild, Output, EventEmitter, Inject, ElementRef, AfterViewInit, HostListener } from '@angular/core';

import {Location} from '@angular/common';



@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent implements OnInit {

  isCategoryVisible = false;
  isPayeeVisible = false;
  isNumPadVisible = false;
  url;
  mode: String = 'New';
  @Output() transactionDetailSaved = new EventEmitter<Transaction>();
  transaction: Transaction;
  newTransactionForm: FormGroup;
  error: string;
  @ViewChild('form') myNgForm; // just to call resetForm method

  transactionType: string;
  filesToUpload: Array<File> = [];
imageSrc: any;
  constructor(private dialog: MatDialog,
    private router: Router,
    private formBuilder: FormBuilder,
    private transactionService: TransactionService,
    // private masterdataService: MasterDataProvider,
    // private snotifyService: SnotifyService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
  //  @Inject(MAT_DIALOG_DATA) public data: any
  ) {

        this.transaction = new Transaction();
        this.newTransactionForm = this.formBuilder.group({
        'transactionType': new FormControl('', [Validators.required]),
        'transactionDate': new FormControl('', [Validators.required]),
        'category': new FormControl('', [Validators.required]),
        'account': new FormControl('', [Validators.required]),
        'payee': new FormControl('', [Validators.required]),
        'amount': new FormControl('', [Validators.required]),
        'notes': new FormControl('', ),
      });

    }

  ngOnInit() {

    const transactionId = this.activatedRoute.snapshot.paramMap.get('id');
    if (transactionId) {
    this.transactionService.getTransactionById(transactionId).subscribe((transaction: Transaction) => {
      this.mode = 'Edit';
      this.transaction = transaction;
      if (transaction.receipts.uniqueName !== '') {
      this.transaction.receipts.uniqueName = AppConfig.documentURL + this.transaction.receipts.uniqueName;
      this.url = this.transaction.receipts.uniqueName;
      console.log('url ' + this.url);
      }
      console.log(JSON.stringify(this.transaction));
    });


  }


  this.activatedRoute.queryParams.subscribe(params => {
    // Defaults to 0 if no query param provided.
    this.transactionType = params['transactionType'] || '';
    this.transaction.transactionType =  this.transactionType;
  });

  this.transaction.transactionDate = moment().toDate();
  }

  createNewTransaction(newTransaction: Transaction) {

  //  console.log(JSON.stringify(newTransaction));
     const transDateTime = new Date(moment(this.transaction.transactionDate).format('YYYY-MM-DD ')
                                        + moment().format('HH:mm'));
     newTransaction.transactionDate = transDateTime;

     if (this.filesToUpload.length > 0 ) {
       console.log('filesToUpload');
       console.log(JSON.stringify(newTransaction));
     this.transactionService.uploadImage(this.filesToUpload).subscribe((uploadedImage: string) => {
      newTransaction.receipts = {name :  this.filesToUpload[0].name, uniqueName : uploadedImage };
      console.log('transaction ' + JSON.stringify(this.transaction));
      console.log('newTransaction ' + JSON.stringify(newTransaction));
      this.saveTransaction(newTransaction);
    });
  } else {
    newTransaction.receipts = {name : '', uniqueName : ''};

    console.log('transaction ' + JSON.stringify(this.transaction));
    console.log('newTransaction ' + JSON.stringify(newTransaction));

     this.saveTransaction(newTransaction);
  }
  }

  saveTransaction(transaction) {

    this.transactionService.createTransaction(transaction).subscribe((newTransactionWithId) => {
      this.transactionDetailSaved.emit(newTransactionWithId);
      this.myNgForm.resetForm();
      this.url = '';
      this.filesToUpload = [];
      this.location.back();
    }, (response: Response) => {
      if (response.status === 500) {
        this.error = 'errorHasOcurred';
      }
    });
  }

  toggleCategoryView() {
    this.isCategoryVisible = this.isCategoryVisible === true ? false : true;
  }

  togglePayeeView() {
    this.isPayeeVisible = this.isPayeeVisible === true ? false : true;
  }

  toggleNumberView() {
    this.isNumPadVisible = this.isNumPadVisible === true ? false : true;
  }

  close() {
    this.location.back();
    }

  onCategorySelected(category) {
    console.log('category ' + category);
    this.transaction.category = category;
    this.toggleCategoryView();
  }

  onPayeeSelected(payee) {
    console.log('payee ' + payee);
    this.transaction.payee = payee;
    this.togglePayeeView();
  }

  onAmountSelected(selectedNumber) {
    console.log('selectedNumber ' + selectedNumber);
    this.transaction.amount = selectedNumber;
    this.toggleNumberView();
  }

  upload() {
    if (this.filesToUpload.length > 0) {
    const files: Array<File> = this.filesToUpload;
    this.transactionService.uploadImage(this.filesToUpload).subscribe((transaction: Transaction) => {
      this.transaction = transaction;
      console.log(JSON.stringify(this.transaction));
    });
  }
}

fileChangeEvent(event: any) {
  console.log('fileChangeEvent');
  const files = event.srcElement.files;
  // console.log(files);
    this.filesToUpload = <Array<File>>event.target.files;

    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;
        // console.log('this.url ' + this.url );
      }
      reader.readAsDataURL(event.target.files[0]);
    }

    }


}

