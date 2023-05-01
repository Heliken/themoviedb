import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvDetailsComponent } from './tv-details.component';
import { PreloaderModule } from '../../components/preloader/preloader.module';
import { DetailedPageModule } from '../../components/detailed-page/detailed-page.module';
import { FavouriteTogglerModule } from '../../components/favourite-toggler/favourite-toggler.module';

@NgModule({
  declarations: [TvDetailsComponent],
  imports: [
    CommonModule,
    PreloaderModule,
    DetailedPageModule,
    FavouriteTogglerModule,
  ],
})
export class TvDetailsModule {}
