import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieDetailsComponent } from './movie-details.component';
import { PreloaderModule } from '../../components/preloader/preloader.module';
import { DetailedPageModule } from '../../components/detailed-page/detailed-page.module';
import { FilterModule } from '../../pipes/filter/filter.module';

@NgModule({
  declarations: [MovieDetailsComponent],
  imports: [CommonModule, PreloaderModule, DetailedPageModule, FilterModule],
})
export class MovieDetailsModule {}
