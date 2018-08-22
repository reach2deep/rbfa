import { AppConfig } from './../../config/app.config';
import { throwError } from 'rxjs/internal/observable/throwError';


import {Observable, of, throwError as observableThrowError, Subject, BehaviorSubject} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';

import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import { Transaction, Category, Payee, PagedData, Page } from './transaction.model';
import * as _ from 'lodash';
import { catchError, tap, map } from 'rxjs/operators';
import { Api } from '../../core/common/api';
import { LoggerService } from '../../core/common/logger.service';
import * as goog from 'goog';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class TransactionService {
  private transactionUrl: string;
  private translations: any;
  private  categoryList: Category[] ;
  private  subCategoryList: Category[] = [];
  private  payeeList: Payee[] = [];



  categoryData: BehaviorSubject<Array<Category>> = new BehaviorSubject<Array<Category>>([]);
  payeeData: BehaviorSubject<Array<Payee>> = new BehaviorSubject<Array<Payee>>([]);


  constructor(private http: HttpClient,
              private snackBar: MatSnackBar,
              public api: Api) {

      this.transactionUrl = AppConfig.endpoints.transactions;
      // this.loadMasters();
  }


  getTransactionsList(
    filter = '', sortOrder = 'asc',
    pageNumber = 0, pageSize = 3):  Observable<Transaction[]> {

    return this.http.get('http://localhost:3000/api/transactionSearch', {
        params: new HttpParams()
            .set('courseId', '111')
            .set('filter', filter)
            .set('sortOrder', sortOrder)
            .set('pageNumber', pageNumber.toString())
            .set('pageSize', pageSize.toString())
    }).pipe(
        // map(res =>  res['transactions']
        map((res: any) => {
          return res;
        })
      // )
    );
  }

  /**
     * A method that mocks a paged server response
     * @param page The selected page
     * @returns {any} An observable containing the employee data
     */
    public getResults(filter = '', sortOrder = 'asc', pageNumber = 0, pageSize = 3): Observable<PagedData<Transaction>> {
      return  this.api
               .get('/transactionSearch',
                new HttpParams()
                    .set('courseId', '111')
                    .set('filter', filter)
                    .set('sortOrder', sortOrder)
                    .set('pageNumber', pageNumber.toString())
                    .set('pageSize', pageSize.toString())

            )
               .pipe(
                 map((res: any ) => {
                  //  console.log(res);
                  const pagedData = new PagedData<Transaction>();
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

  /**
   * Package companyData into a PagedData object based on the selected Page
   * @param page The page data used to get the selected data from companyData
   * @returns {PagedData<CorporateEmployee>} An array of the selected data and page
   */
  // private getPagedData(page: Page): PagedData<Transaction> {
  //     const pagedData = new PagedData<Transaction>();
  //     page.totalElements = companyData.length;
  //     page.totalPages = page.totalElements / page.size;
  //     const start = page.pageNumber * page.size;
  //     const end = Math.min((start + page.size), page.totalElements);
  //     for (let i = start; i < end; i++){
  //         const jsonObj = companyData[i];
  //         const employee = new CorporateEmployee(jsonObj.name, jsonObj.gender, jsonObj.company, jsonObj.age);
  //         pagedData.data.push(employee);
  //     }
  //     pagedData.page = page;
  //     return pagedData;
  // }

  getAllCategories () {
    console.log(this.categoryData.value.length);
    if (this.categoryData.value.length === 0) {
        this.api
        .get(AppConfig.endpoints.category).pipe(
        map((res: any) => {
        return res;
        }))
        .subscribe (
        (data: any) => {
          this.categoryList = data;
        this.categoryData.next(this.categoryList);
        },
        (err: any) => console.error('loadAllPackages: ERROR', err),
        () => console.log('always')
        );
    }
}

getAllPayees () {
  console.log(this.payeeData.value.length);
  if (this.payeeData.value.length === 0) {
      this.api
      .get(AppConfig.endpoints.payee).pipe(
      map((res: any) => {
      return res;
      }))
      .subscribe (
      (data: any) => {
        this.payeeList = data;
      this.payeeData.next(this.payeeList);
      },
      (err: any) => console.error('loadAllPackages: ERROR', err),
      () => console.log('always')
      );
  }
}

// findCourseById(courseId: number): Observable<Category> {
//   return this.http.get<Category>(AppConfig.endpoints.transactions + `/${courseId}`);
// }

// findAllCourses(): Observable<Transaction[]> {
//   return this.http.get('/api/courses')
//       .pipe(
//           map(res => res['payload'])
//       );
// }

// findAllCourseLessons(transactionId: String): Observable<Transaction[]> {
//   return this.http.get(AppConfig.endpoints.transactions, {
//       params: new HttpParams()
//           .set('courseId', transactionId.toString())
//           .set('pageNumber', '0')
//           .set('pageSize', '1000')
//   }).pipe(
//       map(res =>  res['payload'])
//   );
// }





  getAllTransactions() {
    console.log('getAllTransactions');
    return this.api.get(AppConfig.endpoints.transactions)
      .pipe(
      //   tap(transactions => {
      //     console.log('tap '+ transactions);
      //   }
      // ),
      map((res: any) => {
        return res.json();
      }),
        catchError(this.handleError('getAllTransactions', []))
      );
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

  uploadImage(filesToUpload: any): Observable<any> {

    const files: Array<File> = filesToUpload;
    console.log(files);
    const formData: any = new FormData();
    for (let i = 0; i < files.length; i++) {
       formData.append('uploads[]', files[i], files[i]['name']);
    }

    return this.http.post(AppConfig.endpoints.fileupload, formData)
        .pipe(
          tap(response => LoggerService.log('updated')),
          catchError(this.handleError('uploadImage', []))
        );
  }


  // getTransactionsTest() {
  //   console.log('getTransactions');
  //   return this.http.get(this.transactionUrl)
  //   .map(res => res);
  // }

  loadAll() {
    return this.api.get(this.transactionUrl);
  }

  getTransactions(): Observable<Transaction[]> {
    console.log('getTransactions');
    return this.http.get<Transaction[]>(this.transactionUrl);
      // .pipe(
      //   tap(heroes => LoggerService.log(`fetched Transactions`)),
      //   catchError(this.handleError('getTransactions', []))
      // );

      //  return this.http.get<Transaction[]>(this.transactionUrl).pipe(
      //    tap(response => response)
      //    );
  }

  getTransactionById(id: string) {
    const url = `${AppConfig.endpoints.transactions}/${id}`;
    return this.api.get(url).pipe(
      tap((transaction: Transaction) => LoggerService.log('fetched Transaction id' + JSON.stringify(transaction)),
      catchError(this.handleError('getTransaction id='))
    ));
  }

  createTransaction(transaction: Transaction): Observable<Transaction> {
    return this.api.post(this.transactionUrl, JSON.stringify({
      transactionType: transaction.transactionType,
      transactionDate: transaction.transactionDate,
      category: transaction.category,
      subCategory: transaction.subCategory,
      account: transaction.account,
      payee: transaction.payee,
      amount: transaction.amount,
      receipts: transaction.receipts,
      notes: transaction.notes,
      createdAt: transaction.createdAt,
      createdBy: transaction.createdBy
    }), httpOptions).pipe(
      tap((TransactionSaved: Transaction) => {
        LoggerService.log(`added Transaction w/ id=${TransactionSaved.id}`);
        this.showSnackBar('Transaction Created');
      }),
      catchError(this.handleError<Transaction>('addTransaction'))
    );
  }


  showSnackBar(name): void {
    const config: any = new MatSnackBarConfig();
    config.duration = AppConfig.snackBarDuration;
    this.snackBar.open(name, 'OK', config);
  }

  getAllMasters(): Observable<any> {
    return this.http.get<Transaction[]>(AppConfig.endpoints.masters)
      .pipe(
        tap(heroes => LoggerService.log(`fetched masters`)),
        catchError(this.handleError('getAllMasters', []))
      );
  }

  createCategory(newCategory: Category): Observable<Category> {
    return this.api.post(AppConfig.endpoints.category, JSON.stringify({
            name: newCategory.name,
            parent: newCategory.parent,
            type: newCategory.type,
    }), httpOptions).pipe(
      tap((CategorySaved: Category) => {
        LoggerService.log(`added Category w/ id=${CategorySaved.id}`);
        this.showSnackBar('Category Created');
      }),
      catchError(this.handleError<Category>('createCategory'))
    );
  }

  updateCategoryById(updateCategory: Category): Observable<Category> {
    console.log('updateCategoryById' +   JSON.stringify(updateCategory['_id']));
    const url = `${AppConfig.endpoints.category}/${updateCategory['_id']}`;

    return this.api.put(url, JSON.stringify({
            name: updateCategory.name,
            parent: updateCategory.parent,
            type: updateCategory.type,
        }), httpOptions).pipe(
        tap((CategorySaved: Category) => {
          LoggerService.log(`updated Category w/ id=${CategorySaved}`);
          this.showSnackBar('Category update');
        }),
        catchError(this.handleError<Category>('updateCategoryById'))
        );
  }

  deleteCategoryById(id: any): Observable<Category> {
    const url = `${AppConfig.endpoints.category}/${id}`;

    return this.api.delete(url, httpOptions).pipe(
      tap((res: Response) => LoggerService.log(`deleted Category id=` + res)),
      catchError(this.handleError<Category>('deleteCategory'))
    );
  }


  createPayee(newPayee: Payee): Observable<Payee> {
    return this.api.post(AppConfig.endpoints.payee, JSON.stringify({
            name: newPayee.name,
            address: newPayee.address,
            mobile: newPayee.mobile,
            notes: newPayee.notes
    }), httpOptions).pipe(
      tap((PayeeSaved: Payee) => {
        LoggerService.log(`added Category w/ id=${PayeeSaved.id}`);
        this.showSnackBar('Paye Created');
      }),
      catchError(this.handleError<Payee>('createPayee'))
    );
  }

  updatePayeeById(updatePayee: Payee): Observable<Payee> {
    console.log('updateCategoryById' +   JSON.stringify(updatePayee['_id']));
    const url = `${AppConfig.endpoints.payee}/${updatePayee['_id']}`;

    return this.api.put(url, JSON.stringify({
            name: updatePayee.name,
            address: updatePayee.address,
            mobile: updatePayee.mobile,
            notes: updatePayee.notes
        }), httpOptions).pipe(
        tap((PayeeSaved: Payee) => {
          LoggerService.log(`updated Payee w/ id=${PayeeSaved}`);
          this.showSnackBar('Payee update');
        }),
        catchError(this.handleError<Payee>('updatePayeeById'))
        );
  }

  deletePayeeById(id: any): Observable<Payee> {
    const url = `${AppConfig.endpoints.payee}/${id}`;

    return this.api.delete(url, httpOptions).pipe(
      tap((res: Response) => LoggerService.log(`deleted payee id=` + res)),
      catchError(this.handleError<Category>('deleteCategory'))
    );
  }

  public getPayees(): Payee[] {
    if (this.payeeList.length === 0) {
      this.loadMasters();
      return this.payeeList;
    } else {
    return this.payeeList;
    }
}

// public getSubCategories(): Category[] {
//   if (this.subCategoryList.length === 0) {
//     this.loadMasters();
//    // this.subCategoryList = _.reject(this.subCategoryList, { 'parent': ''});
//     return this.subCategoryList;
//   } else {
//    //  this.subCategoryList = _.reject(this.subCategoryList, { 'parent': ''});
//   return this.subCategoryList;
//   }
// }

getCategories1() {

  console.log('getCategories1 CALL');
    this.http.get(AppConfig.endpoints.masters).pipe(
      tap(heroes => console.log(`fetched masters`)),
      catchError(this.handleError('getAllMasters', []))
    );

}

// fetch(): Observable<Category[]> {

//   if (this.categoryList === undefined) {
//   // return this.http.get(AppConfig.endpoints.masters).pipe(
//   //   map((response: Response) =>  <Category[]>response['categories'] ,
//   //   error => console.log(error)
//   // )).subscribe(rex=> console.log('dsd'));

//         this.api
//         .get(AppConfig.endpoints.masters).pipe(
//         map((res: any) => {
//         return res;
//         }))
//         .subscribe (
//         (data: any) => {
//         this.packageData.next(data);
//         },
//         (err: any) => console.error('loadAllPackages: ERROR', err),
//         () => console.log('loadAllPackages: always')
//         );

// } else {
//   console.log('in else');
//   return this.categoryList;
// }
// }

// private data1 = new BehaviorSubject(undefined);
// private fetching: boolean;
// private empDetailSubject = new BehaviorSubject(null);


// getUser(): Observable<Category[]> {
//   return this.http.get('/api/user')
//     .pipe(
//     map((res: Response) => 
//     ((category: Category) => new Category().deserialize(category))
//     ));
// }

// getCategories() {
//   return this.http.get(AppConfig.endpoints.masters)
//       .pipe(
//         map(jsonObj => Object.assign(new Category(), jsonObj),
//         catchError(this.networkService.handleError)
//       );

//   //this.empDetailSubject.next(data);
// }


// private getData1() {
//     return this.data1.asObservable();
// }
// awaitData() {
//     if (!goog.isDef(this.data1.getValue()) && !this.fetching) {
//         this.refresh();
//     }
//     return this.getData1();
// }
// refresh() {
//     this.fetching = true;
//     data1.fetch().then(data => {
//         this.fetching = false;
//         this.data1.next(data);
//     }, err => {
//         this.fetching = false;
//         this.data1.error(err);
//     });
// }

 // return this.http.get(AppConfig.endpoints.masters);
  // console.log(this.categoryList);
  // if (this.categoryList === undefined) {
  //   this.loadMasters().subscribe(() => {
  //     console.log('subscribe Masters...');
  //  // this.categoryList = _.filter(this.categoryList, { 'parent': ''});
  //  console.log(this.categoryList);
  //   return this.categoryList;
  //   });

  // } else {
  //  // this.categoryList = _.filter(this.categoryList, { 'parent': ''});
  // return this.categoryList;
  // }
// }

loadMasters() {

    console.log('Loading Masters...');

    // this.transactionService.getAllMasters().subscribe((masters: any) => {
    //   this.payeeList = masters['payees'];
    //   this.categoryList = masters['categories'];
    //   this.subCategoryList =  masters['categories'];
    //   this.categoryList = _.filter(this.categoryList, { 'parent': ''});
    //   this.subCategoryList = _.reject(this.subCategoryList, { 'parent': ''});
    //  // console.log('Master SUB ' + console.log(this.subCategoryList));
    //   // console.log('Masters Loaded');

    // });

    // return this.http.get(AppConfig.endpoints.masters).map((masters: any) => {
    //   console.log('mapping Masters...');
    //     this.payeeList = masters['payees'];
    //     this.categoryList = masters['categories'];
    //     this.subCategoryList =  masters['categories'];
    //  //   this.categoryList = _.filter(this.categoryList, { 'parent': ''});
    //     this.subCategoryList = _.reject(this.subCategoryList, { 'parent': ''});
    //    // console.log('Master SUB ' + console.log(this.subCategoryList));
    //      console.log('Masters Loaded');
    //   });

  }

   private extractData(res: Response) {
    const body = res;
    return body || { };
  }

  getMasters(): Observable<any> {
    return this.http.get(AppConfig.endpoints.masters).pipe(
      map((this.extractData), {
        // this.payeeList = masters['payees'];
        // this.categoryList = _.filter(this.categoryList, { 'parent': ''});
        // this.subCategoryList = _.reject(this.subCategoryList, { 'parent': ''});
      }),
      catchError(this.handleError1));
  }

  private handleError1(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }


}
