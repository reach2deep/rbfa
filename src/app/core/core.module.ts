import { LayoutModule } from './layout/layout.module';
import { CommonModule } from '@angular/common';
import { MenuListItemComponent } from './menu-list-item/menu-list-item.component';
import { TopNavComponent } from './top-nav/top-nav.component';

import { NavService } from './services/nav.service';


import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MatIconRegistry } from '@angular/material';


import { MaterialModule } from './common/material-components.module';
import { PendingInterceptorModule } from './common/loading-indicator/pending-interceptor.module';


@NgModule({
  imports: [
    // CommonModule,
    // // Layout Module (Sidenav, Toolbar, Quickpanel, Content)
    // LayoutModule,
    // MaterialModule

    // Displays Loading Bar when a Route Request or HTTP Request is pending
    PendingInterceptorModule,

    // Layout Module (Sidenav, Toolbar, Quickpanel, Content)
    LayoutModule

  ],
  declarations: [
    // TopNavComponent,
    // MenuListItemComponent
  ],
  // exports: [
  //   TopNavComponent,
  //   MenuListItemComponent,

  // ],
  providers: [
    MatIconRegistry,
    // NavService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only.');
    }
  }
}
