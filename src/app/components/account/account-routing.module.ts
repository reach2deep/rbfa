import { AccountListComponent } from './account-list/account-list.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const Account_Routes: Routes = [
    {
        path: '',
        component: AccountListComponent
      },
   ];

@NgModule({
  imports: [RouterModule.forChild(Account_Routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule { }

// export const transactionRouter = RouterModule.forChild(Transaction_Routes);
