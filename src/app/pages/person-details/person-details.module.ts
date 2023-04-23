import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonDetailsComponent } from './person-details.component';
import { DetailedPageModule } from '../../components/detailed-page/detailed-page.module';
import { PreloaderModule } from '../../components/preloader/preloader.module';
import { UiCardModule } from 'src/app/components/ui-card/ui-card.module';
import { UiCardsGridModule } from '../../components/ui-cards-grid/ui-cards-grid.module';
import { ToGridItemsModule } from '../../pipes/to-grid-items/to-grid-items.module';
import { ToKnownForModule } from '../../pipes/to-known-for/to-known-for.module';
import { SortModule } from '../../pipes/sort/sort.module';
import { ConcatModule } from '../../pipes/concat/concat.module';

@NgModule({
  declarations: [PersonDetailsComponent],
  exports: [PersonDetailsComponent],
  imports: [
    CommonModule,
    DetailedPageModule,
    PreloaderModule,
    UiCardModule,
    UiCardsGridModule,
    ToGridItemsModule,
    ToKnownForModule,
    SortModule,
    ConcatModule,
  ],
})
export class PersonDetailsModule {}
