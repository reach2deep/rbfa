import { Directive } from '@angular/core';

@Directive({
  selector: '[appPage]',
  host: { 'class': 'app-page' }
})
export class PageDirective {

  constructor() {
  }

}
