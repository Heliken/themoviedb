import { NgModule } from '@angular/core';
import { ConcatPipe } from './concat.pipe';

@NgModule({
  declarations: [ConcatPipe],
  exports: [ConcatPipe],
  imports: [],
})
export class ConcatModule {}
