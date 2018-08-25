import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppCardModule } from '../../common/card/card.module';
import { AppChartWidgetModule } from '../../common/chart-widget/chart-widget.module';
import { LoadingOverlayModule } from '../../common/loading-overlay/loading-overlay.module';
import { MaterialModule } from '../../common/material-components.module';
import { DonutChartWidgetComponent } from './donut-chart-widget.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,

    // Core
    AppCardModule,
    LoadingOverlayModule,

    // Chart Widget Style
    AppChartWidgetModule
  ],
  declarations: [DonutChartWidgetComponent],
  exports: [DonutChartWidgetComponent]
})
export class DonutChartWidgetModule {
}
