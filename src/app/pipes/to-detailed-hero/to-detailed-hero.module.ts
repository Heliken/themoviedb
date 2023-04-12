import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToDetailedHeroPipe } from './to-detailed-hero.pipe';

@NgModule({
  declarations: [ToDetailedHeroPipe],
  exports: [ToDetailedHeroPipe],
  imports: [CommonModule],
})
export class ToDetailedHeroModule {}
