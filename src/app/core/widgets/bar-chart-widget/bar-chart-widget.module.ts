import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppChartWidgetModule } from '../../common/chart-widget/chart-widget.module';
import { LoadingOverlayModule } from '../../common/loading-overlay/loading-overlay.module';
import { MaterialModule } from '../../common/material-components.module';
import { BarChartWidgetComponent } from './bar-chart-widget.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,

    // Core
    LoadingOverlayModule,

    // Chart Widget Style
    AppChartWidgetModule
  ],
  declarations: [BarChartWidgetComponent],
  exports: [BarChartWidgetComponent]
})
export class BarChartWidgetModule {
}
