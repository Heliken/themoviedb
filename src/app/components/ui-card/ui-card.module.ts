import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiCardComponent } from './ui-card.component';
import { ImgSrcModule } from '../../pipes/img-src/img-src.module';
import { RatingBadgeModule } from '../rating-badge/rating-badge.module';

@NgModule({
  declarations: [UiCardComponent],
  exports: [UiCardComponent],
  imports: [CommonModule, ImgSrcModule, RatingBadgeModule],
})
export class UiCardModule {}
