import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AppCard,
  AppCardActions,
  AppCardContent,
  AppCardHeader,
  AppCardHeaderActions,
  AppCardHeaderSubTitle,
  AppCardHeaderTitle
} from './card.component';

const cardComponents = [
  AppCard,
  AppCardHeader,
  AppCardHeaderTitle,
  AppCardHeaderSubTitle,
  AppCardHeaderActions,
  AppCardContent,
  AppCardActions
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ...cardComponents
  ],
  exports: [
    ...cardComponents
  ]
})
export class AppCardModule {
}
