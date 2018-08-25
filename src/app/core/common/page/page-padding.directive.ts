import { Directive } from '@angular/core';

@Directive({
  selector: '[appPagePadding]',
  host: { 'class': 'app-page-padding' }
})
export class PagePaddingDirective {

  constructor() {
  }

}
