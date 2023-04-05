import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToGridItemsPipe } from './to-grid-items.pipe';

@NgModule({
  declarations: [ToGridItemsPipe],
  exports: [ToGridItemsPipe],
  imports: [CommonModule],
})
export class ToGridItemsModule {}
