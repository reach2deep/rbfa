import { NumberViewComponent } from './../transaction/number-view/number-view.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { Api } from './../../core/common/api';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../core/common/material-components.module';
import { FormsModule, ReactiveFormsModule } from '../../../../node_modules/@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ImageViewerModule } from '@hallysonh/ngx-imageviewer';
import {NgcFloatButtonModule} from 'ngc-float-button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MomentModule } from 'ngx-moment';
import { AccountService } from './account.service';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountRoutingModule } from './account-routing.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxDatatableModule,
        MaterialModule,
        NgcFloatButtonModule,
        FontAwesomeModule,
        MomentModule,
        AccountRoutingModule
    ],
    exports: [],
    declarations: [
        AccountListComponent,
        AccountDetailComponent  
      ],

    entryComponents: [
        AccountDetailComponent,
        NumberViewComponent
    ],
    providers: [Api,
        AccountService ,
        ]
})
export class AccountModule { }
