import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { SearchResultSectionComponent } from './components/search-result-section/search-result-section.component';
import { ToGridItemsModule } from '../../pipes/to-grid-items/to-grid-items.module';
import { UiCardsGridModule } from '../ui-cards-grid/ui-cards-grid.module';

@NgModule({
  declarations: [SearchComponent, SearchResultSectionComponent],
  exports: [SearchComponent],
  imports: [CommonModule, ToGridItemsModule, UiCardsGridModule],
})
export class SearchModule {}
