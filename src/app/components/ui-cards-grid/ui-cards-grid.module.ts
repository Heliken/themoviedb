import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiCardsGridComponent } from './ui-cards-grid.component';
import { UiCardModule } from '../ui-card/ui-card.module';
import { RouterLink } from '@angular/router';
import { UiCardsGridPreloaderComponent } from './ui-cards-grid-preloader/ui-cards-grid-preloader.component';

@NgModule({
  declarations: [UiCardsGridComponent, UiCardsGridPreloaderComponent],
  exports: [UiCardsGridComponent, UiCardsGridPreloaderComponent],
  imports: [CommonModule, UiCardModule, RouterLink],
})
export class UiCardsGridModule {}
