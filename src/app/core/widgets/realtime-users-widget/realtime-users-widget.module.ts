import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppCardModule } from '../../common/card/card.module';
import { MaterialModule } from '../../common/material-components.module';
import { RealtimeUsersWidgetComponent } from './realtime-users-widget.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,

    // Core
    AppCardModule,
  ],
  declarations: [RealtimeUsersWidgetComponent],
  exports: [RealtimeUsersWidgetComponent]
})
export class RealtimeUsersWidgetModule {
}
