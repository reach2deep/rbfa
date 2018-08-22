import { CommonModule } from '@angular/common';
import { MenuListItemComponent } from './menu-list-item/menu-list-item.component';
import { TopNavComponent } from './top-nav/top-nav.component';

import { NavService } from './services/nav.service';


import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MatIconRegistry } from '@angular/material';

import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from './common/material-components.module';


@NgModule({
  imports: [
    CommonModule,
    // Layout Module (Sidenav, Toolbar, Quickpanel, Content)
    LayoutModule,
    MaterialModule
  ],
  declarations: [
    TopNavComponent,
    MenuListItemComponent
  ],
  exports: [
    TopNavComponent,
    MenuListItemComponent,

  ],
  providers: [
    MatIconRegistry,
    NavService
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
