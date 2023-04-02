import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { GENRES_CACHE_KEY } from 'src/api-info';
import { GenresResponse } from '../types/api-genres';
import { forkJoin, map } from 'rxjs';
import { Genres } from '../types/genres';

@Injectable({
  providedIn: 'root',
})
export class ApiGenresService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  public getGenres(): Genres | undefined {
    return this.genres;
  }

  public loadGenres(): void {
    console.log('load genres');
    if (this.cachedGenres) {
      console.log(this.cachedGenres);
      this.genres = this.cachedGenres;
    } else {
      this.requestGenres();
    }
  }

  private cacheKey = GENRES_CACHE_KEY;
  private cachedGenres = this.localStorageService.getItem(this.cacheKey);
  private genres?: Genres;

  private requestGenres(): void {
    const movieGenres$ = this.http.get<GenresResponse>('/api/genre/movie/list');
    const tvShowsGenres$ = this.http.get<GenresResponse>('/api/genre/tv/list');

    forkJoin([movieGenres$, tvShowsGenres$])
      .pipe(
        map(([movieGenresResponse, tvShowsGenresResponse]) => {
          return {
            movie: movieGenresResponse.genres,
            tvShows: tvShowsGenresResponse.genres,
          };
        })
      )
      .subscribe(data => {
        this.saveGenres(data);
      });
  }

  private saveGenres(newGenres: Genres): void {
    this.genres = newGenres;

    this.localStorageService.setItem(this.cacheKey, {
      data: newGenres,
      timestamp: Date.now().toString(),
    });
  }
}
