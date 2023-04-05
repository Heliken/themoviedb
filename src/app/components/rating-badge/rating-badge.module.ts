import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingBadgeComponent } from './rating-badge.component';

@NgModule({
  declarations: [RatingBadgeComponent],
  exports: [RatingBadgeComponent],
  imports: [CommonModule],
})
export class RatingBadgeModule {}
