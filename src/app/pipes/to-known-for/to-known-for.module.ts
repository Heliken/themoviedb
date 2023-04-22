import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToKnownForPipe } from './to-known-for.pipe';

@NgModule({
  declarations: [ToKnownForPipe],
  exports: [ToKnownForPipe],
  imports: [CommonModule],
})
export class ToKnownForModule {}
