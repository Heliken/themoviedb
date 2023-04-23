import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindPipe } from './find.pipe';

@NgModule({
  declarations: [FindPipe],
  exports: [FindPipe],
  imports: [CommonModule],
})
export class FindModule {}
