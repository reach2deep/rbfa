import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TransactionService } from './../transaction.service';
import { Category } from './../transaction.model';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {

  @Output() selectedSubcategory = new EventEmitter<string>();

  @Input() parentCategory: Category;

  @Input() categories: Category[];



  subCategories: Category[] ;
  canAddEditItem = false;
  isEditEnabled = false;
  selectedSubCategory: string;
  addEditSubCategoryItem: Category;
  newSubCategoryForm: FormGroup;
  categoryDataSubscription: Subscription;


  constructor(private transactionService: TransactionService,private formBuilder: FormBuilder) {

    this.newSubCategoryForm = this.formBuilder.group({
      'name': new FormControl('', [Validators.required])
    });

  }

  ngOnInit() {
    // console.log('parentCategory ' +  JSON.stringify(this.parentCategory));
    // // console.log('subCategories List ' + JSON.stringify(this.masterdataService.getCategories()));
    // // this.subCategories = this.masterdataService.getCategories();

    // this.transactionService.getAllMasters().subscribe((masters: any) => {
    //   // this.payeeList = masters['payees'];
    //   this.subCategories = masters['categories'];
    //   this.subCategories = _.filter(this.subCategories, { 'parent': this.parentCategory.name});
    //   console.log('Masters Loaded ' +   JSON.stringify(masters));
    // });

    // this.subCategories = this.masterdataService.getSubCategories();
    this.subCategories = _.filter(this.categories, { 'parent': this.parentCategory.name});
    console.log('masterdataService subCategories ' + JSON.stringify(this.subCategories));

  }

  setSubCategorySelected(subcategory) {
      if (!this.isEditEnabled) {
        this.selectedSubcategory.emit(subcategory);
      } else {
        this.isEditEnabled = true;
        this.canAddEditItem = true;
        this.addEditSubCategoryItem = subcategory;
      }
   }

   editList() {
    // this.addEditCategoryItem = this.selectedCategory;
    this.isEditEnabled = this.isEditEnabled === true ? false : true;
    console.log('editList');
  }

  addNewItem() {
    this.addEditSubCategoryItem = new Category('0', '', '', '');
    this.canAddEditItem = true;
    console.log('addNewItem');
  }

  editItem(category) {
    console.log('editItem category' + JSON.stringify(category));
    this.addEditSubCategoryItem = category;
    console.log('editItem ' + JSON.stringify(this.addEditSubCategoryItem));
  }

  saveItem() {
    if (this.addEditSubCategoryItem.id === '0') {
      this.addEditSubCategoryItem.parent = this.parentCategory.name;
       console.log('SAVE AS NEW ' + JSON.stringify(this.addEditSubCategoryItem));
      this.transactionService.createCategory(this.addEditSubCategoryItem).subscribe((response: any) => {
        console.log('Categry Created' +   JSON.stringify(response));
        this.subCategories.push(response);
        // this.masterdataService.loadMasters();
      });
    } else {
      console.log('UPDATE Item ' + JSON.stringify(this.addEditSubCategoryItem));
      this.transactionService.updateCategoryById(this.addEditSubCategoryItem).subscribe((response: any) => {
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
    const index: number = this.subCategories.indexOf(category);
      console.log('SAVE AS NEW ' + JSON.stringify(this.addEditSubCategoryItem));
      this.transactionService.deleteCategoryById(category['_id']).subscribe((response: any) => {
        console.log('Categry deleted' +   JSON.stringify(response));
        // this.categories.splice(category);

      if (index !== -1) {
          this.subCategories.splice(index, 1);
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

}
