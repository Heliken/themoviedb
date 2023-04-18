import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapGetPipe } from './map-get.pipe';

@NgModule({
  declarations: [MapGetPipe],
  exports: [MapGetPipe],
  imports: [CommonModule],
})
export class MapGetModule {}
