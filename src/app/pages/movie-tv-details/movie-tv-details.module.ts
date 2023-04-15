import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieTvDetailsComponent } from './movie-tv-details.component';
import { ToDetailedHeroModule } from '../../pipes/to-detailed-hero/to-detailed-hero.module';
import { PreloaderModule } from '../../components/preloader/preloader.module';
import { DetailedPageModule } from '../../components/detailed-page/detailed-page.module';

@NgModule({
  declarations: [MovieTvDetailsComponent],
  imports: [
    CommonModule,
    ToDetailedHeroModule,
    PreloaderModule,
    DetailedPageModule,
  ],
})
export class MovieTvDetailsModule {}
