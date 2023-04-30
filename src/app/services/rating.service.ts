import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MediaListResponse } from '../types/media-list-response';
import { MovieDTORated } from '../types/DTO/movie-dto';
import {
  BehaviorSubject,
  Observable,
  distinctUntilChanged,
  forkJoin,
  map,
  tap,
} from 'rxjs';
import { RatedMap } from '../types/rated-map';
import { CanBeRatedMediaType, MediaType } from '../types/media-type';
import { PostRatingResponse } from '../types/post-rating-response';
import { UserInfoService } from './user-info.service';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  constructor(private http: HttpClient, private userInfo: UserInfoService) {}

  public ratedMovies$ = new BehaviorSubject<RatedMap>(
    new Map<number, number>()
  );

  public ratedTvShows$ = new BehaviorSubject<RatedMap>(
    new Map<number, number>()
  );

  public ratedMaps = {
    [MediaType.Movie]: this.ratedMovies$,
    [MediaType.Tv]: this.ratedTvShows$,
  };

  postRating(
    id: number,
    type: CanBeRatedMediaType,
    value: number
  ): Observable<PostRatingResponse> {
    return this.http.post<PostRatingResponse>(
      `${type}/${id}/rating?session_id=${this.userInfo.getSessionId()}`,
      {
        value,
      }
    );
  }

  addNewRated(id: number, type: CanBeRatedMediaType, rating: number) {
    const currentRatedMap = this.ratedMaps[type].getValue();
    const newRatedMap = new Map(currentRatedMap).set(id, rating);
    this.ratedMaps[type].next(newRatedMap);
  }

  getRating(
    id: number,
    type: CanBeRatedMediaType
  ): Observable<number | undefined> {
    return this.ratedMaps[type].pipe(
      map((ratedMap: RatedMap) => ratedMap.get(id)),
      distinctUntilChanged()
    );
  }

  requestRatedMovies(sessionId: string): Observable<RatedMap> {
    return this.http
      .get<MediaListResponse<MovieDTORated>>(
        `account/${sessionId}/rated/movies`
      )
      .pipe(
        map(({ results }) => this.convertToMap(results)),
        tap(resultsMap => this.ratedMovies$.next(resultsMap))
      );
  }

  requestRatedTvShows(sessionId: string): Observable<RatedMap> {
    return this.http
      .get<MediaListResponse<MovieDTORated>>(`account/${sessionId}/rated/tv`)
      .pipe(
        map(({ results }) => this.convertToMap(results)),
        tap(resultsMap => this.ratedTvShows$.next(resultsMap))
      );
  }

  clearRatingLists(): void {
    this.ratedMovies$.next(new Map<number, number>());
    this.ratedTvShows$.next(new Map<number, number>());
  }

  requestRatedMoviesAndTvShows(sessionId: string) {
    return forkJoin([
      this.requestRatedMovies(sessionId),
      this.requestRatedMovies(sessionId),
    ]);
  }

  private convertToMap(movies: MovieDTORated[]): Map<number, number> {
    return new Map(movies.map(({ id, rating }) => [id, rating]));
  }
}
