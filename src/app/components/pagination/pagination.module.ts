import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination.component';
import { PaginationPipe } from './pagination.pipe';

@NgModule({
  declarations: [PaginationComponent, PaginationPipe],
  exports: [PaginationComponent],
  imports: [CommonModule],
})
export class PaginationModule {}
