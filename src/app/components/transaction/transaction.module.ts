import { FlexLayoutModule } from '@angular/flex-layout';
import { ListModule } from './../../core/common/list/list.module';
import { NumberViewComponent } from './number-view/number-view.component';
import { PayeeComponent } from './payee/payee.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { CategoryComponent } from './category/category.component';
import { Api } from './../../core/common/api';
import { TransactionService } from './transaction.service';
import { CommonModule } from '@angular/common';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionDashboardComponent } from './transaction-dashboard/transaction-dashboard.component';
import { MaterialModule } from '../../core/common/material-components.module';
import { FormsModule, ReactiveFormsModule } from '../../../../node_modules/@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ImageViewerModule } from '@hallysonh/ngx-imageviewer';
import {NgcFloatButtonModule} from 'ngc-float-button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MomentModule } from 'ngx-moment';
import { PageModule } from '../../core/common/page/page.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        NgxDatatableModule,
        MaterialModule,
        PageModule,
        ListModule,
        ImageViewerModule,
        TransactionRoutingModule,
        NgcFloatButtonModule,
        FontAwesomeModule,
        MomentModule
    ],
    declarations: [
        TransactionDashboardComponent,
        TransactionListComponent,
        TransactionDetailComponent,
        CategoryComponent,
        SubCategoryComponent,
        PayeeComponent,
        NumberViewComponent
    ],
    providers: [Api,
        TransactionService ,
        ]
})
export class TransactionModule { }
