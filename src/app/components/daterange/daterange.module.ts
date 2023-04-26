import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DaterangeComponent } from './daterange.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DaterangeComponent],
  exports: [DaterangeComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class DaterangeModule {}
