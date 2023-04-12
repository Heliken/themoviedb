import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailedPageHeroComponent } from './detailed-page-hero.component';
import { ImgSrcModule } from '../../pipes/img-src/img-src.module';
import { RatingBadgeModule } from '../rating-badge/rating-badge.module';

@NgModule({
  declarations: [DetailedPageHeroComponent],
  exports: [DetailedPageHeroComponent],
  imports: [CommonModule, ImgSrcModule, RatingBadgeModule],
})
export class DetailedPageHeroModule {}
