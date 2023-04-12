import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailedPageHeroComponent } from './detailed-page-hero.component';

@NgModule({
  declarations: [DetailedPageHeroComponent],
  exports: [DetailedPageHeroComponent],
  imports: [CommonModule],
})
export class DetailedPageHeroModule {}
