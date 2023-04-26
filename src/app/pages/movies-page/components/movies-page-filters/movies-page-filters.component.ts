import { Component } from '@angular/core';
import { genres } from '../../configs/sort-config';

@Component({
  selector: 'mdb-movies-page-filters',
  templateUrl: './movies-page-filters.component.html',
  styleUrls: ['./movies-page-filters.component.scss'],
})
export class MoviesPageFiltersComponent {
  public showFilters = false;

  public toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  public genres = genres;
}
