import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material-components.module';
import {
  AppChartWidget,
  AppChartWidgetContent,
  AppChartWidgetHeader,
  AppChartWidgetHeaderActions,
  AppChartWidgetHeaderSubTitle,
  AppChartWidgetHeaderTitle
} from './chart-widget.component';

const chartWidgetComponents = [
  AppChartWidget,
  AppChartWidgetHeader,
  AppChartWidgetHeaderTitle,
  AppChartWidgetHeaderSubTitle,
  AppChartWidgetHeaderActions,
  AppChartWidgetContent
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [...chartWidgetComponents],
  exports: [...chartWidgetComponents]
})
export class AppChartWidgetModule {
}
