import { Component } from '@angular/core';
import { genres } from '../../configs/sort-config';

@Component({
  selector: 'mdb-movies-page-genres',
  templateUrl: './movies-page-genres.component.html',
  styleUrls: ['./movies-page-genres.component.scss'],
})
export class MoviesPageGenresComponent {
  public genres = genres;
}
