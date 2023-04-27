import { Component } from '@angular/core';
import { MoviesPageApiService } from '../../movies-page-api.service';

@Component({
  selector: 'mdb-movies-page-genres',
  templateUrl: './movies-page-genres.component.html',
  styleUrls: ['./movies-page-genres.component.scss'],
})
export class MoviesPageGenresComponent {
  constructor(private moviesApiService: MoviesPageApiService) {}
  public genres$ = this.moviesApiService.requestGenres();
}
