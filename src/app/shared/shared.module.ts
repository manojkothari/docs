import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomPipe } from './pipes/custom.pipe';
import { CustomDirective } from './directives/custom.directive';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PopperDirective } from './directives/popper.directive';

@NgModule({
  declarations: [
    CustomPipe,
    CustomDirective,
    PopperDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCheckboxModule
  ],
  exports: [PopperDirective]
})
export class SharedModule { }
