import { PayeeComponent } from './payee/payee.component';
import { CategoryComponent } from './category/category.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { TransactionDashboardComponent } from './transaction-dashboard/transaction-dashboard.component';
import { NumberViewComponent } from './number-view/number-view.component';

const Transaction_Routes: Routes = [
    {
        path: '',
        component: TransactionDashboardComponent
      },
    {
      path: 'list',
      component: TransactionListComponent
    },
    {
      path: 'new',
    component: TransactionDetailComponent
    },
    {
        path: ':id',
      component: TransactionDetailComponent
    },
    {
      path: 'category',
    component: CategoryComponent
  },
  {
    path: 'payee',
  component: PayeeComponent
},
{
  path: 'num',
component: NumberViewComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(Transaction_Routes)],
  exports: [RouterModule],
})
export class TransactionRoutingModule { }

// export const transactionRouter = RouterModule.forChild(Transaction_Routes);
