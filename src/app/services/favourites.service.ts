import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  map,
  tap,
  forkJoin,
  distinctUntilChanged,
} from 'rxjs';
import { MovieDTO } from '../types/DTO/movie-dto';
import { MediaListResponse } from '../types/media-list-response';
import { MediaType, CanBeRatedMediaType } from '../types/media-type';
import { PostRatingResponse } from '../types/post-rating-response';
import { UserInfoService } from './user-info.service';
import { CanBeRatedMediaItem, MediaItem } from '../types/media-item';
import { DtoTransformService } from './dto-transform.service';
import { TvShowDTO } from '../types/DTO/tv-show-dto';
import { FavMap } from '../types/favourites-map';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  constructor(
    private http: HttpClient,
    private userInfo: UserInfoService,
    private dtoTransfom: DtoTransformService
  ) {}

  public favMovies$ = new BehaviorSubject<FavMap>(new Map<number, MediaItem>());

  public favTvShows$ = new BehaviorSubject<FavMap>(
    new Map<number, MediaItem>()
  );

  public favMaps = {
    [MediaType.Movie]: this.favMovies$,
    [MediaType.Tv]: this.favTvShows$,
  };

  postToggleFav(
    media_id: number,
    media_type: CanBeRatedMediaType,
    favorite: boolean
  ): Observable<PostRatingResponse> {
    return this.http.post<PostRatingResponse>(
      `account/${this.userInfo.getSessionId()}/favorite`,
      {
        media_id,
        media_type,
        favorite,
      }
    );
  }

  addNewFav(mediaItem: CanBeRatedMediaItem) {
    const { mediaType: type, id } = mediaItem;

    const currentFavMap = this.favMaps[type].getValue();
    const newRatedMap = new Map(currentFavMap).set(id, mediaItem);

    this.favMaps[type].next(newRatedMap);
  }

  isInFavourites(id: number, type: CanBeRatedMediaType): Observable<boolean> {
    return this.favMaps[type].pipe(
      map((favourites: FavMap) => !!favourites.get(id)),
      distinctUntilChanged()
    );
  }

  requestFavMovies(sessionId: string): Observable<FavMap> {
    return this.http
      .get<MediaListResponse<MovieDTO>>(`account/${sessionId}/favorite/movies`)
      .pipe(
        map(({ results }) =>
          results.map(movie => this.dtoTransfom.transformMovie(movie))
        ),
        map(list => this.convertToMap(list)),
        tap(list => this.favMovies$.next(list))
      );
  }

  requestFavTvShows(sessionId: string): Observable<FavMap> {
    return this.http
      .get<MediaListResponse<TvShowDTO>>(`account/${sessionId}/favorite/tv`)
      .pipe(
        map(({ results }) =>
          results.map(tv => this.dtoTransfom.transformTVShow(tv))
        ),
        map(list => this.convertToMap(list)),
        tap(list => this.favMovies$.next(list))
      );
  }

  clearFavLists(): void {
    this.favMovies$.next(new Map<number, CanBeRatedMediaItem>());
    this.favTvShows$.next(new Map<number, CanBeRatedMediaItem>());
  }

  requestFavMoviesAndTvShows(sessionId: string) {
    return forkJoin([
      this.requestFavMovies(sessionId),
      this.requestFavTvShows(sessionId),
    ]);
  }

  private convertToMap(
    movies: CanBeRatedMediaItem[]
  ): Map<number, CanBeRatedMediaItem> {
    return new Map(movies.map(elem => [elem.id, elem]));
  }
}
