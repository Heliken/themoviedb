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
import { DetailedPageHeroCrewComponent } from './components/detailed-page-hero-crew/detailed-page-hero-crew.component';
import { DetailedPageBodyComponent } from './components/detailed-page-body/detailed-page-body.component';
import { UiCardsGridModule } from '../ui-cards-grid/ui-cards-grid.module';
import { ToGridItemsModule } from '../../pipes/to-grid-items/to-grid-items.module';
import { DetailedPageSectionComponent } from './components/detailed-page-section/detailed-page-section.component';
import { GroupCastByNamePipe } from './pipes/group-cast-by-name.pipe';
import { JoinModule } from '../../pipes/join/join.module';
import { SortModule } from '../../pipes/sort/sort.module';
@NgModule({
  declarations: [
    DetailedPageHeroRatingComponent,
    DetailedPageHeroComponent,
    DetailedPageHeroBgComponent,
    DetailedPageHeroDescriptionComponent,
    DetailedPageHeroSectionComponent,
    DetailedPageHeroGenresComponent,
    DetailedPageHeroDateComponent,
    DetailedPageHeroCrewComponent,
    DetailedPageBodyComponent,
    DetailedPageSectionComponent,
    GroupCastByNamePipe,
  ],
  exports: [
    DetailedPageHeroRatingComponent,
    DetailedPageHeroComponent,
    DetailedPageHeroBgComponent,
    DetailedPageHeroDescriptionComponent,
    DetailedPageHeroSectionComponent,
    DetailedPageHeroGenresComponent,
    DetailedPageHeroDateComponent,
    DetailedPageHeroCrewComponent,
    DetailedPageBodyComponent,
    DetailedPageSectionComponent,
  ],
  imports: [
    CommonModule,
    RatingBadgeModule,
    ImgSrcModule,
    UiCardsGridModule,
    ToGridItemsModule,
    JoinModule,
    SortModule,
  ],
})
export class DetailedPageModule {}
