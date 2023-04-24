import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesPageComponent } from './movies-page.component';
import { PaginationModule } from '../../components/pagination/pagination.module';

@NgModule({
  declarations: [MoviesPageComponent],
  imports: [CommonModule, PaginationModule],
})
export class MoviesPageModule {}
