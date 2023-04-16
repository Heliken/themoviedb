import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvDetailsComponent } from './tv-details.component';
import { PreloaderModule } from '../../components/preloader/preloader.module';
import { ToDetailedHeroModule } from '../../pipes/to-detailed-hero/to-detailed-hero.module';
import { DetailedPageModule } from '../../components/detailed-page/detailed-page.module';
import { FilterModule } from '../../pipes/filter/filter.module';

@NgModule({
  declarations: [TvDetailsComponent],
  imports: [
    CommonModule,
    PreloaderModule,
    ToDetailedHeroModule,
    DetailedPageModule,
    FilterModule,
  ],
})
export class TvDetailsModule {}
