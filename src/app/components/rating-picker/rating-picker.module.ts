import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingPickerComponent } from './rating-picker.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MapGetModule } from '../../pipes/map-get/map-get.module';

@NgModule({
  declarations: [RatingPickerComponent],
  exports: [RatingPickerComponent],
  imports: [CommonModule, ReactiveFormsModule, MapGetModule],
})
export class RatingPickerModule {}
