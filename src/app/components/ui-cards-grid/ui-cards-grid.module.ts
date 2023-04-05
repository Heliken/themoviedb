import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiCardsGridComponent } from './ui-cards-grid.component';
import { UiCardModule } from '../ui-card/ui-card.module';

@NgModule({
  declarations: [UiCardsGridComponent],
  exports: [UiCardsGridComponent],
  imports: [CommonModule, UiCardModule],
})
export class UiCardsGridModule {}
