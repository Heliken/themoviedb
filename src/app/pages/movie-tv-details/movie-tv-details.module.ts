import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieTvDetailsComponent } from './movie-tv-details.component';
import { DetailedPageHeroModule } from '../../components/detailed-page-hero/detailed-page-hero.module';
import { ToDetailedHeroModule } from '../../pipes/to-detailed-hero/to-detailed-hero.module';
import { PreloaderModule } from '../../components/preloader/preloader.module';
import { DetailedPageBodyModule } from '../../components/detailed-page-body/detailed-page-body.module';

@NgModule({
  declarations: [MovieTvDetailsComponent],
  imports: [
    CommonModule,
    DetailedPageHeroModule,
    ToDetailedHeroModule,
    PreloaderModule,
    DetailedPageBodyModule,
  ],
})
export class MovieTvDetailsModule {}
