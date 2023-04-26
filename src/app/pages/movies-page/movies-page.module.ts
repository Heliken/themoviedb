import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesPageComponent } from './movies-page.component';
import { PaginationModule } from '../../components/pagination/pagination.module';
import { PreloaderModule } from '../../components/preloader/preloader.module';
import { UiCardsGridModule } from '../../components/ui-cards-grid/ui-cards-grid.module';
import { ToGridItemsModule } from '../../pipes/to-grid-items/to-grid-items.module';
import { SelectModule } from '../../components/select/select.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MoviesPageFiltersComponent } from './components/movies-page-filters/movies-page-filters.component';
import { MoviesPageGenresComponent } from './components/movies-page-genres/movies-page-genres.component';
import { DaterangeModule } from '../../components/daterange/daterange.module';

@NgModule({
  declarations: [
    MoviesPageComponent,
    MoviesPageFiltersComponent,
    MoviesPageGenresComponent,
  ],
  imports: [
    CommonModule,
    PaginationModule,
    PreloaderModule,
    UiCardsGridModule,
    ToGridItemsModule,
    SelectModule,
    ReactiveFormsModule,
    DaterangeModule,
  ],
})
export class MoviesPageModule {}
