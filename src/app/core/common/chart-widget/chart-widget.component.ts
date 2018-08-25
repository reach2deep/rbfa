import { ChangeDetectionStrategy, Component, Directive, ViewEncapsulation } from '@angular/core';

// noinspection TsLint
@Component({
  selector: 'app-chart-widget',
  templateUrl: './chart-widget.component.html',
  styleUrls: ['./chart-widget.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'app-chart-widget' }
})
export class AppChartWidget {
}

// noinspection TsLint
@Component({
  selector: 'app-chart-widget-header',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'app-chart-widget-header' },
  template: `
    <div class="app-chart-widget-header-title-group">
      <ng-content select="app-chart-widget-header-title"></ng-content>
      <ng-content select="app-chart-widget-header-sub-title"></ng-content>
    </div>
    <ng-content select="app-chart-widget-header-actions"></ng-content>
  `
})
export class AppChartWidgetHeader {
}

// noinspection TsLint
@Directive({
  selector: 'app-chart-widget-header-title',
  host: { 'class': 'app-chart-widget-header-title' }
})
export class AppChartWidgetHeaderTitle {
}

// noinspection TsLint
@Directive({
  selector: 'app-chart-widget-header-sub-title',
  host: { 'class': 'app-chart-widget-header-sub-title' }
})
export class AppChartWidgetHeaderSubTitle {
}

// noinspection TsLint
@Directive({
  selector: 'app-chart-widget-header-actions',
  host: { 'class': 'app-chart-widget-header-actions' }
})
export class AppChartWidgetHeaderActions {
}

// noinspection TsLint
@Component({
  selector: 'app-chart-widget-content',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'app-chart-widget-content' },
  template: `
    <ng-content></ng-content>`
})
export class AppChartWidgetContent {
}
