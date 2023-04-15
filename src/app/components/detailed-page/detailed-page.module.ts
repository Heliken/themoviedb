import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingBadgeModule } from '../rating-badge/rating-badge.module';
import { DetailedPageHeroComponent } from './components/detailed-page-hero/detailed-page-hero.component';
import { ImgSrcModule } from '../../pipes/img-src/img-src.module';
import { DetailedPageHeroBgComponent } from './components/detailed-page-hero-bg/detailed-page-hero-bg.component';
import { DetailedPageHeroDescriptionComponent } from './components/detailed-page-hero-description/detailed-page-hero-description.component';
import { DetailedPageHeroSectionComponent } from './components/detailed-page-hero-section/detailed-page-hero-section.component';
import { DetailedPageHeroGenresComponent } from './components/detailed-page-hero-genres/detailed-page-hero-genres.component';
import { DetailedPageHeroDateComponent } from './components/detailed-page-hero-date/detailed-page-hero-date.component';
import { DetailedPageHeroRatingComponent } from './components/detailed-page-hero-rating/detailed-page-hero-rating.component';

@NgModule({
  declarations: [
    DetailedPageHeroRatingComponent,
    DetailedPageHeroComponent,
    DetailedPageHeroBgComponent,
    DetailedPageHeroDescriptionComponent,
    DetailedPageHeroSectionComponent,
    DetailedPageHeroGenresComponent,
    DetailedPageHeroDateComponent,
  ],
  exports: [
    DetailedPageHeroRatingComponent,
    DetailedPageHeroComponent,
    DetailedPageHeroBgComponent,
    DetailedPageHeroDescriptionComponent,
    DetailedPageHeroSectionComponent,
    DetailedPageHeroGenresComponent,
    DetailedPageHeroDateComponent,
  ],
  imports: [CommonModule, RatingBadgeModule, ImgSrcModule],
})
export class DetailedPageModule {}
