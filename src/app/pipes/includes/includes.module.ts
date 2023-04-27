import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncludesPipe } from './includes.pipe';

@NgModule({
  declarations: [IncludesPipe],
  exports: [IncludesPipe],
  imports: [CommonModule],
})
export class IncludesModule {}
