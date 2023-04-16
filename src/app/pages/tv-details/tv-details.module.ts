import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvDetailsComponent } from './tv-details.component';
import { PreloaderModule } from '../../components/preloader/preloader.module';
import { DetailedPageModule } from '../../components/detailed-page/detailed-page.module';

@NgModule({
  declarations: [TvDetailsComponent],
  imports: [CommonModule, PreloaderModule, DetailedPageModule],
})
export class TvDetailsModule {}
