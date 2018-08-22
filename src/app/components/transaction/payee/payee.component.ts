import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TransactionService } from './../transaction.service';
import { Payee } from './../transaction.model';
import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-payee',
  templateUrl: './payee.component.html',
  styleUrls: ['./payee.component.css']
})
export class PayeeComponent implements OnInit, OnDestroy {

  @Output() selectedPayeeChange = new EventEmitter<string>();

  payees: Payee[] ; // = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  selectedPayee: Payee;
  canAddEditItem = false;
  isEditEnabled = false;
  addEditPayeeItem: Payee;
  newPayeeForm: FormGroup;
  payeeDataSubscription: Subscription;

  constructor(private transactionService: TransactionService,
    private formBuilder: FormBuilder) {
      this.newPayeeForm = this.formBuilder.group({
        'name': new FormControl('', [Validators.required])
      });
    }

  ngOnInit() {
  //  console.log('categoryList ' + JSON.stringify(this.masterdataService.getCategories()));
    // this.payees = this.masterdataService.getPayees();

    // this.transactionService.getAllMasters().subscribe((masters: any) => {
    //   // this.payeeList = masters['payees'];
    //   this.payees = masters['payees'];
    // //  this.subCategories = _.filter(this.subCategories, { 'parent': this.parentCategory.name});
    //   console.log('Masters Loaded ' +   JSON.stringify(masters));
    // });

    // this.payees = this.masterdataService.getPayees();
   // console.log('masterdataService payees ' + JSON.stringify(this.payees));

   this.payeeDataSubscription = this.transactionService.payeeData.subscribe((data) => { // <-------
    this.payees = data; console.log(this.payees);
  });
  this.transactionService.getAllPayees();

  }

   setSelectedPayee(payee) {
    if (!this.isEditEnabled) {
    this.selectedPayee = payee;
     this.selectedPayeeChange.emit(this.selectedPayee.name);
    } else {
      this.isEditEnabled = true;
      this.canAddEditItem = true;
      this.addEditPayeeItem = payee;
    }
   }

   editList() {
    // this.addEditCategoryItem = this.selectedCategory;
    this.isEditEnabled = this.isEditEnabled === true ? false : true;
    console.log('editList');
  }

  addNewItem() {
    this.addEditPayeeItem = new Payee('0', '', '', '', '');
    this.canAddEditItem = true;
    console.log('addNewItem');
  }

  editItem(category) {
    console.log('editItem category' + JSON.stringify(category));
    this.addEditPayeeItem = category;
    console.log('editItem ' + JSON.stringify(this.addEditPayeeItem));
  }

  saveItem() {
    if (this.addEditPayeeItem.id === '0') {
       console.log('SAVE AS NEW ' + JSON.stringify(this.addEditPayeeItem));
      this.transactionService.createPayee(this.addEditPayeeItem).subscribe((response: any) => {
        console.log('Categry Created' +   JSON.stringify(response));
        this.payees.push(response);
      });
    } else {
      console.log('UPDATE Item ' + JSON.stringify(this.addEditPayeeItem));
      this.transactionService.updatePayeeById(this.addEditPayeeItem).subscribe((response: any) => {
        console.log('Categry Updated' +   JSON.stringify(response));
      });
    }
    this.isEditEnabled = false;
    this.canAddEditItem = false;
    console.log('saveNewItem');
  }

  deleteItem(e: Event, category) {

    e.preventDefault();
    e.stopImmediatePropagation();
    const index: number = this.payees.indexOf(category);
      console.log('SAVE AS NEW ' + JSON.stringify(this.addEditPayeeItem));
      this.transactionService.deletePayeeById(category['_id']).subscribe((response: any) => {
        console.log('Categry deleted' +   JSON.stringify(response));
        // this.categories.splice(category);

      if (index !== -1) {
          this.payees.splice(index, 1);
      }
      });

    this.isEditEnabled = false;
    this.canAddEditItem = false;
    console.log('saveNewItem');
  }
  cancelAddEditItem() {
    this.isEditEnabled = false;
    this.canAddEditItem = false;
    console.log('cancelAddEditItem');
  }

  ngOnDestroy() {
    this.payeeDataSubscription.unsubscribe();
  }


}
