import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailedPageBodyComponent } from './detailed-page-body.component';
import { UiCardsGridModule } from '../ui-cards-grid/ui-cards-grid.module';
import { ToGridItemsModule } from '../../pipes/to-grid-items/to-grid-items.module';

@NgModule({
  declarations: [DetailedPageBodyComponent],
  exports: [DetailedPageBodyComponent],
  imports: [CommonModule, UiCardsGridModule, ToGridItemsModule],
})
export class DetailedPageBodyModule {}
