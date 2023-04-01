import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { TrendingTimeWindow, TrendingType } from '../../types/trending-request';
import { MediaListResponse } from 'src/app/types/media-list-response';
import { GridMediaItem } from 'src/app/types/grid-media-item';
import { MovieDTO } from 'src/app/types/DTO/movie-dto';
import { TvShowDTO } from 'src/app/types/DTO/tv-show-dto';
import { MediaItem } from 'src/app/types/media-item';
import { DtoTransformService } from 'src/app/services/dto-transform.service';
import { Movie } from 'src/app/types/movie';
import { TvShow } from 'src/app/types/tv-show';
import { MediaToGridMediaService } from 'src/app/services/media-to-grid-media.service';
import { RESPONSE_PER_PAGE } from 'src/api-info';

@Injectable({
  providedIn: 'root',
})
export class MainpageRequestsService {
  constructor(
    private readonly http: HttpClient,
    private readonly dtoTranform: DtoTransformService,
    private readonly mediaToGridMedia: MediaToGridMediaService
  ) {}

  requestTrending(
    timeWindow: TrendingTimeWindow = TrendingTimeWindow.day
  ): Observable<GridMediaItem[]> {
    const trendingMoviesRequest$ = this.http.get<MediaListResponse<MovieDTO>>(
      `/api/trending/${TrendingType.movie}/${timeWindow}`
    );
    const trendingTvShowsRequest$ = this.http.get<MediaListResponse<TvShowDTO>>(
      `/api/trending/${TrendingType.tv}/${timeWindow}`
    );

    const joinedMoviesAndTvShows = this.joinMoviesAndTvShows(
      trendingTvShowsRequest$,
      trendingMoviesRequest$
    );

    return this.convertToGridMediaItem(joinedMoviesAndTvShows);
  }

  requestPopular(): Observable<GridMediaItem[]> {
    const popularMoviesRequest$ =
      this.http.get<MediaListResponse<MovieDTO>>('/api/movie/popular');
    const popularTvShowsRequest$ =
      this.http.get<MediaListResponse<TvShowDTO>>('/api/tv/popular');

    const joinedMoviesAndTvShows = this.joinMoviesAndTvShows(
      popularTvShowsRequest$,
      popularMoviesRequest$
    );

    return this.convertToGridMediaItem(joinedMoviesAndTvShows);
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

  convertToGridMediaItem(
    data: Observable<MediaItem[]>
  ): Observable<GridMediaItem[]> {
    return data.pipe(
      map(mediaList =>
        mediaList.map(mediaItem => this.mediaToGridMedia.convert(mediaItem))
      )
    );
  }

  requestUpcoming(): Observable<GridMediaItem[]> {
    const upcomingMovies = this.http
      .get<MediaListResponse<MovieDTO>>('/api/movie/upcoming')
      .pipe(
        map(({ results }) =>
          results.map(movie => this.dtoTranform.transformMovie(movie))
        )
      );
    return this.convertToGridMediaItem(upcomingMovies);
  }
}
