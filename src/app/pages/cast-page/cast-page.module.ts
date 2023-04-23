import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CastPageComponent } from './cast-page.component';
import { PreloaderModule } from '../../components/preloader/preloader.module';
import { UiCardsGridModule } from '../../components/ui-cards-grid/ui-cards-grid.module';
import { ToGridItemsModule } from '../../pipes/to-grid-items/to-grid-items.module';
import { ConcatModule } from '../../pipes/concat/concat.module';
import { GroupByModule } from '../../pipes/group-array-by/group-array-by.module';

@NgModule({
  declarations: [CastPageComponent],
  imports: [
    CommonModule,
    PreloaderModule,
    UiCardsGridModule,
    ToGridItemsModule,
    ConcatModule,
    GroupByModule,
  ],
})
export class CastPageModule {}
