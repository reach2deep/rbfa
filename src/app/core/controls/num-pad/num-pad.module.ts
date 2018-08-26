import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NumPadComponent } from './num-pad.component';
import { MaterialModule } from '../../common/material-components.module';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [NumPadComponent],
  exports: [NumPadComponent]
})
export class NumPadModule {
}
