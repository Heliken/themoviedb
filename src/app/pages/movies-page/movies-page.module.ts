import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesPageComponent } from './movies-page.component';
import { PaginationModule } from '../../components/pagination/pagination.module';
import { PreloaderModule } from '../../components/preloader/preloader.module';
import { UiCardsGridModule } from '../../components/ui-cards-grid/ui-cards-grid.module';
import { ToGridItemsModule } from '../../pipes/to-grid-items/to-grid-items.module';
import { SelectModule } from '../../components/select/select.module';

@NgModule({
  declarations: [MoviesPageComponent],
  imports: [
    CommonModule,
    PaginationModule,
    PreloaderModule,
    UiCardsGridModule,
    ToGridItemsModule,
    SelectModule,
  ],
})
export class MoviesPageModule {}
