import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingBadgeModule } from '../rating-badge/rating-badge.module';
import { DetailedPageHeroComponent } from './components/detailed-page-hero/detailed-page-hero.component';
import { ImgSrcModule } from '../../pipes/img-src/img-src.module';
import { DetailedPageHeroBgComponent } from './components/detailed-page-hero-bg/detailed-page-hero-bg.component';
import { DetailedPageHeroSectionComponent } from './components/detailed-page-hero-section/detailed-page-hero-section.component';
import { DetailedPageHeroGenresComponent } from './components/detailed-page-hero-genres/detailed-page-hero-genres.component';
import { DetailedPageHeroRatingComponent } from './components/detailed-page-hero-rating/detailed-page-hero-rating.component';
import { DetailedPageHeroCrewComponent } from './components/detailed-page-hero-crew/detailed-page-hero-crew.component';
import { DetailedPageBodyComponent } from './components/detailed-page-body/detailed-page-body.component';
import { UiCardsGridModule } from '../ui-cards-grid/ui-cards-grid.module';
import { ToGridItemsModule } from '../../pipes/to-grid-items/to-grid-items.module';
import { DetailedPageSectionComponent } from './components/detailed-page-section/detailed-page-section.component';
import { JoinModule } from '../../pipes/join/join.module';
import { SortModule } from '../../pipes/sort/sort.module';
import { RatingPickerModule } from '../rating-picker/rating-picker.module';
import { DetailedPageHeroKnownForComponent } from './components/detailed-page-hero-known-for/detailed-page-hero-known-for.component';
import { UiCardModule } from '../ui-card/ui-card.module';
import { RouterLink } from '@angular/router';
import { DetailedPageRolesComponent } from './components/detailed-page-roles/detailed-page-roles.component';
import { GroupByModule } from '../../pipes/group-array-by/group-array-by.module';
import { FindModule } from '../../pipes/find/find.module';
import { FilterModule } from '../../pipes/filter/filter.module';
import { GroupCastByNameModule } from '../../pipes/group-cast-by-name/group-cast-by-name.module';

@NgModule({
  declarations: [
    DetailedPageHeroRatingComponent,
    DetailedPageHeroComponent,
    DetailedPageHeroBgComponent,
    DetailedPageHeroSectionComponent,
    DetailedPageHeroGenresComponent,
    DetailedPageHeroCrewComponent,
    DetailedPageBodyComponent,
    DetailedPageSectionComponent,
    DetailedPageHeroKnownForComponent,
    DetailedPageRolesComponent,
  ],
  exports: [
    DetailedPageHeroRatingComponent,
    DetailedPageHeroComponent,
    DetailedPageHeroBgComponent,
    DetailedPageHeroSectionComponent,
    DetailedPageHeroGenresComponent,
    DetailedPageHeroCrewComponent,
    DetailedPageBodyComponent,
    DetailedPageSectionComponent,
    DetailedPageHeroKnownForComponent,
    DetailedPageRolesComponent,
  ],
  imports: [
    CommonModule,
    RatingBadgeModule,
    ImgSrcModule,
    UiCardsGridModule,
    ToGridItemsModule,
    JoinModule,
    SortModule,
    RatingPickerModule,
    UiCardModule,
    RouterLink,
    GroupByModule,
    FindModule,
    FilterModule,
    GroupCastByNameModule,
  ],
})
export class DetailedPageModule {}
