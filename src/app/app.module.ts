import { MaterialModule } from './core/common/material-components.module';
import { CoreModule } from './core/core.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { MomentModule } from 'ngx-moment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserXhr } from '@angular/http';
import { NgProgressModule } from '@ngx-progressbar/core';
import {  NgProgressBrowserXhr } from 'ngx-progressbar';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '../../node_modules/@angular/forms';
import { ImageViewerModule } from '@hallysonh/ngx-imageviewer';
import {SnotifyModule, SnotifyService, ToastDefaults} from 'ng-snotify';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    MomentModule,
    FormsModule,
    FlexLayoutModule,
    ImageViewerModule,
    NgProgressModule.forRoot({
      spinnerPosition: 'left',
      color: '#f71cff',
      thick: true
    }),
    NgProgressHttpModule,
    FontAwesomeModule,
    CoreModule
  ],
  providers: [
    { provide: BrowserXhr, useClass: NgProgressBrowserXhr },
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
