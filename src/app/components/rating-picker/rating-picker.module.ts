import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingPickerComponent } from './rating-picker.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RatingPickerComponent],
  exports: [RatingPickerComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class RatingPickerModule {}
