import { ChangeDetectionStrategy, Component, Directive, Input, ViewEncapsulation } from '@angular/core';

// noinspection TsLint
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  host: { 'class': 'app-card' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppCard {
}

// noinspection TsLint
@Component({
  selector: 'app-card-header',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'app-card-header' },
  template: `
    <div class="app-card-header-title-group">
      <ng-content select="app-card-header-title"></ng-content>
      <ng-content select="app-card-header-sub-title"></ng-content>
    </div>
    <ng-content></ng-content>
    <ng-content select="app-card-header-actions"></ng-content>
  `
})
export class AppCardHeader {
}

// noinspection TsLint
@Component({
  selector: 'app-card-content',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'app-card-content' },
  template: `
    <ng-content></ng-content>`
})
export class AppCardContent {
}

// noinspection TsLint
@Directive({
  selector: 'app-card-header-title',
  host: { 'class': 'app-card-header-title' }
})
export class AppCardHeaderTitle {
}

// noinspection TsLint
@Directive({
  selector: 'app-card-header-sub-title',
  host: { 'class': 'app-card-header-sub-title' }
})
export class AppCardHeaderSubTitle {
}

// noinspection TsLint
@Directive({
  selector: 'app-card-header-actions',
  host: { 'class': 'app-card-header-actions' }
})
export class AppCardHeaderActions {
}

// noinspection TsLint
@Directive({
  selector: 'app-card-actions',
  host: {
    'class': 'app-card-actions',
    '[class.app-card-actions-align-end]': 'align === "end"',
  }
})
export class AppCardActions {
  /** Position of the actions inside the card. */
  @Input() align: 'start' | 'end' = 'start';
}
