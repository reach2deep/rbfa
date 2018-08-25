// import { PageNotFoundComponent } from './core/common/page-not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';

const routes: Routes = [
  // {
  //   path: 'login',
  //   loadChildren: 'app/demo/custom-pages/login/login.module#LoginModule',
  // },
  // {
  //   path: 'register',
  //   loadChildren: 'app/demo/custom-pages/register/register.module#RegisterModule',
  // },
  // {
  //   path: 'forgot-password',
  //   loadChildren: 'app/demo/custom-pages/forgot-password/forgot-password.module#ForgotPasswordModule',
  // },
   {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'transaction',
        loadChildren: './components/transaction/transaction.module#TransactionModule',
      },
      {
        path: 'account',
        loadChildren: './components/account/account.module#AccountModule',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
