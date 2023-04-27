import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CastPageComponent } from './cast-page.component';
import { PreloaderModule } from '../../components/preloader/preloader.module';
import { UiCardsGridModule } from '../../components/ui-cards-grid/ui-cards-grid.module';
import { ToGridItemsModule } from '../../pipes/to-grid-items/to-grid-items.module';
import { ConcatModule } from '../../pipes/concat/concat.module';
import { GroupByModule } from '../../pipes/group-array-by/group-array-by.module';
import { GroupCastByNameModule } from '../../pipes/group-cast-by-name/group-cast-by-name.module';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [CastPageComponent],
  imports: [
    CommonModule,
    PreloaderModule,
    UiCardsGridModule,
    ToGridItemsModule,
    ConcatModule,
    GroupByModule,
    GroupCastByNameModule,
    RouterLink,
  ],
})
export class CastPageModule {}
