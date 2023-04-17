import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToRatingPostConfigPipe } from './to-rating-post-config.pipe';

@NgModule({
  declarations: [ToRatingPostConfigPipe],
  exports: [ToRatingPostConfigPipe],
  imports: [CommonModule],
})
export class ToRatingPostConfigModule {}
