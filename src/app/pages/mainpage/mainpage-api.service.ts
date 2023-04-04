import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { TrendingTimeWindow, TrendingType } from '../../types/trending-request';
import { MediaListResponse } from 'src/app/types/media-list-response';
import { MovieDTO } from 'src/app/types/DTO/movie-dto';
import { TvShowDTO } from 'src/app/types/DTO/tv-show-dto';
import { MediaItem } from 'src/app/types/media-item';
import { DtoTransformService } from 'src/app/services/dto-transform.service';
import { Movie } from 'src/app/types/movie';
import { TvShow } from 'src/app/types/tv-show';
import { RESPONSE_PER_PAGE } from 'src/api-info';

@Injectable({
  providedIn: 'root',
})
export class MainpageRequestsService {
  constructor(
    private readonly http: HttpClient,
    private readonly dtoTranform: DtoTransformService
  ) {}

  requestTrending(
    timeWindow: TrendingTimeWindow = TrendingTimeWindow.day
  ): Observable<MediaItem[]> {
    const trendingMoviesRequest$ = this.http.get<MediaListResponse<MovieDTO>>(
      `trending/${TrendingType.movie}/${timeWindow}`
    );
    const trendingTvShowsRequest$ = this.http.get<MediaListResponse<TvShowDTO>>(
      `trending/${TrendingType.tv}/${timeWindow}`
    );

    return this.joinMoviesAndTvShows(
      trendingTvShowsRequest$,
      trendingMoviesRequest$
    );
  }

  requestPopular(): Observable<MediaItem[]> {
    const popularMoviesRequest$ =
      this.http.get<MediaListResponse<MovieDTO>>('movie/popular');
    const popularTvShowsRequest$ =
      this.http.get<MediaListResponse<TvShowDTO>>('tv/popular');

    return this.joinMoviesAndTvShows(
      popularTvShowsRequest$,
      popularMoviesRequest$
    );
  }

  joinMoviesAndTvShows(
    tvShowsRequest$: Observable<MediaListResponse<TvShowDTO>>,
    moviesRequest$: Observable<MediaListResponse<MovieDTO>>,
    itemsPerType = Math.round(RESPONSE_PER_PAGE / 2)
  ): Observable<(Movie | TvShow)[]> {
    return forkJoin([tvShowsRequest$, moviesRequest$]).pipe(
      map(([tvShowsResponse, moviesResponse]) => {
        const movies = moviesResponse.results
          .slice(0, itemsPerType)
          .map(movie => this.dtoTranform.transformMovie(movie));
        const tvShows = tvShowsResponse.results
          .slice(0, itemsPerType)
          .map(tvShow => this.dtoTranform.transformTVShow(tvShow));

        return [...movies, ...tvShows];
      })
    );
  }

  requestUpcoming(): Observable<MediaItem[]> {
    return this.http
      .get<MediaListResponse<MovieDTO>>('movie/upcoming')
      .pipe(
        map(({ results }) =>
          results.map(movie => this.dtoTranform.transformMovie(movie))
        )
      );
  }
}
