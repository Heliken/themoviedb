import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortPipe } from './sort.pipe';

@NgModule({
  declarations: [SortPipe],
  exports: [SortPipe],
  imports: [CommonModule],
})
export class SortModule {}
