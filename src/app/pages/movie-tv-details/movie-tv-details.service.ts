import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DtoTransformService } from 'src/app/services/dto-transform.service';
import { MovieDTODetailed } from 'src/app/types/DTO/movie-dto';
import { TvShowDTODetailed } from 'src/app/types/DTO/tv-show-dto';
import { MovieDetailed } from 'src/app/types/movie';
import { TvShowDetailed } from 'src/app/types/tv-show';

@Injectable({
  providedIn: 'root',
})
export class MovieTvDetailsAPIService {
  constructor(
    private readonly http: HttpClient,
    private readonly dtoTransform: DtoTransformService
  ) {}

  requestMovieDetailedData(id: number): Observable<MovieDetailed> {
    return this.http
      .get<MovieDTODetailed>(`movie/${id}?append_to_response=credits`)
      .pipe(map(movie => this.dtoTransform.transformMovieDetailed(movie)));
  }

  requestTvShowDetailedData(id: number): Observable<TvShowDetailed> {
    return this.http
      .get<TvShowDTODetailed>(`tv/${id}?append_to_response=credits`)
      .pipe(map(tvShow => this.dtoTransform.transformTVShowDetailed(tvShow)));
  }
}
