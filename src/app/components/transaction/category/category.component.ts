import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TransactionService } from './../transaction.service';
import { Category } from './../transaction.model';
import { Observable, Subscription } from 'rxjs';
import * as _ from 'lodash';

import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';


library.add(fas, far);

import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {

  @Output() selectedCategoryChange = new EventEmitter < string > ();

  allCategories: Category[] ;
  categories: Category[] ; // = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  canSelectSubCategory = false;
  canAddEditItem = false;
  isEditEnabled = false;
  selectedCategory: Category;
  addEditCategoryItem: Category;
  result: any;
  newCategoryForm: FormGroup;
  categoryDataSubscription: Subscription;

  constructor(private transactionService: TransactionService,
    private formBuilder: FormBuilder
  ) {

    this.newCategoryForm = this.formBuilder.group({
      'name': new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {

    // this.transactionService.getAllMasters().subscribe((masters: any) => {
    //   // this.payeeList = masters['payees'];
    //   this.categories = masters['categories'];
    //   this.categories = _.filter(this.categories, { 'parent': ''});
    //   console.log('Masters Loaded ' +   JSON.stringify(this.categories));
    // });

    // this.transactionService.loadAllPackages();
    // // categories$ = usersObservable.map(users => [...users]); // copy users so in-place sort is ok
    // // categories$ = usersObservable.map(users => users.sort((u1, u2) => u2.age-u1.age));
    // this.categoryDataSubscription = categories$.s.subscribe(users => this.users = users);


    // this.transactionService.loadAllPackages();
  this.categoryDataSubscription = this.transactionService.categoryData.subscribe((data) => { // <-------
     this.allCategories = data; console.log(this.categories);
    this.categories = _.filter(data, { 'parent': ''});
  });
  this.transactionService.getAllCategories();


    // this
    // .transactionService
    // .packageData
    // .subscribe((packages: Array<Category>) => {

    //   // mimic a slow connection
    //   setTimeout(() => {
    //     // set packages
    //     this.categories = packages;
    //     //  the data
    //    // this.sortByPrice();
    //    console.log( this.categories);
    //   }, 1500);
    // });

  // make the http request
 // this.transactionService.loadAllPackages();
   // console.log('masterdataService categoryList ' + JSON.stringify(this.result));
  }

  setCategorySelected(category) {
    console.log('Selected category ' + JSON.stringify(category));
    if (!this.isEditEnabled) {
      this.selectedCategory = category;
      this.canSelectSubCategory = true;
    } else {
      this.isEditEnabled = true;
      this.canAddEditItem = true;
      this.editItem(category);
    }
  }

  setSelectedSubCategory(subcategory) {
    this.canSelectSubCategory = false;
   this.selectedCategoryChange.emit(this.selectedCategory.name + '/' + subcategory.name);
  }

  editList() {
    // this.addEditCategoryItem = this.selectedCategory;
    this.isEditEnabled = this.isEditEnabled === true ? false : true;
    console.log('editList');
  }

  addNewItem() {
    this.addEditCategoryItem = new Category('0', '', '', '');
    this.canAddEditItem = true;
    console.log('addNewItem');
  }

  editItem(category) {
    console.log('editItem category' + JSON.stringify(category));
    this.addEditCategoryItem = category;
    console.log('editItem ' + JSON.stringify(this.addEditCategoryItem));
  }

  saveItem() {
    if (this.addEditCategoryItem.id === '0') {
      console.log('SAVE AS NEW ' + JSON.stringify(this.addEditCategoryItem));
      this.transactionService.createCategory(this.addEditCategoryItem).subscribe((response: any) => {
        console.log('Categry Created' +   JSON.stringify(response));
        this.categories.push(response);
        // this.masterdataService.loadMasters();
      });
    } else {
      console.log('UPDATE Item ' + JSON.stringify(this.addEditCategoryItem));
      this.transactionService.updateCategoryById(this.addEditCategoryItem).subscribe((response: any) => {
        console.log('Categry Updated' +   JSON.stringify(response));
        // this.masterdataService.loadMasters();
      });
    }

    this.isEditEnabled = false;
    this.canAddEditItem = false;
    console.log('saveNewItem');
  }

  deleteItem(e: Event, category) {

    e.preventDefault();
    e.stopImmediatePropagation();
    const index: number = this.categories.indexOf(category);
      console.log('SAVE AS NEW ' + JSON.stringify(this.addEditCategoryItem));
      this.transactionService.deleteCategoryById(category['_id']).subscribe((response: any) => {
        console.log('Categry deleted' +   JSON.stringify(response));
        // this.categories.splice(category);

      if (index !== -1) {
          this.categories.splice(index, 1);
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
    this.categoryDataSubscription.unsubscribe();
  }


}
