import { Directive } from '@angular/core';

@Directive({
  selector: '[appAspectRatioContent]',
  host: { '[class.app-aspect-ratio-content-element]': 'true' }
})
export class AspectRatioContentDirective {

  constructor() {
  }

}
