import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouriteTogglerComponent } from './favourite-toggler.component';

@NgModule({
  declarations: [FavouriteTogglerComponent],
  exports: [FavouriteTogglerComponent],
  imports: [CommonModule],
})
export class FavouriteTogglerModule {}
