import { PageNotFoundComponent } from './common/page-not-found.component';

import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { environment } from '../../environments/environment';
import { LayoutModule } from '@angular/cdk/layout';


@NgModule({
  imports: [

    // Layout Module (Sidenav, Toolbar, Quickpanel, Content)
    LayoutModule,
    PageNotFoundComponent
  ],
  providers: [
    MatIconRegistry
  ],
  declarations: []
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only.');
    }
  }
}
