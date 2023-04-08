import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { SearchResultSectionComponent } from './components/search-result-section/search-result-section.component';
import { ToGridItemsModule } from '../../pipes/to-grid-items/to-grid-items.module';
import { UiCardsGridModule } from '../ui-cards-grid/ui-cards-grid.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PreloaderModule } from '../preloader/preloader.module'; // import the ReactiveFormsModule

@NgModule({
  declarations: [SearchComponent, SearchResultSectionComponent],
  exports: [SearchComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ToGridItemsModule,
    UiCardsGridModule,
    PreloaderModule,
  ],
})
export class SearchModule {}
