import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MediaListResponse } from '../types/media-list-response';
import { MovieDTORated } from '../types/DTO/movie-dto';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { RatedMap } from '../types/rated-map';
import { CanBeRatedMediaType, MediaType } from '../types/media-type';
import { GuestSessionService } from './guest-session.service';
import { PostRatingResponse } from '../types/post-rating-response';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  constructor(
    private http: HttpClient,
    private guestSessionService: GuestSessionService
  ) {}

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
      `${type}/${id}/rating?guest_session_id=${this.guestSessionService.getSessionId()}`,
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

  requestRatedMovies(sessionId: string): Observable<RatedMap> {
    return this.http
      .get<MediaListResponse<MovieDTORated>>(
        `guest_session/${sessionId}/rated/movies`
      )
      .pipe(
        map(({ results }) => this.convertToMap(results)),
        tap(resultsMap => this.ratedMovies$.next(resultsMap))
      );
  }

  requestRatedTvShows(sessionId: string): Observable<RatedMap> {
    return this.http
      .get<MediaListResponse<MovieDTORated>>(
        `guest_session/${sessionId}/rated/tv`
      )
      .pipe(
        map(({ results }) => this.convertToMap(results)),
        tap(resultsMap => this.ratedTvShows$.next(resultsMap))
      );
  }

  private convertToMap(movies: MovieDTORated[]): Map<number, number> {
    return new Map(movies.map(({ id, rating }) => [id, rating]));
  }
}
