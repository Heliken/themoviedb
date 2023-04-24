import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesPageApiService } from './movies-page-api.service';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { UICardsGridType } from '../../types/ui-types/ui-cards-grid-type';

@Component({
  selector: 'mdb-movies-page',
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.scss'],
})
export class MoviesPageComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private moviesApiService: MoviesPageApiService
  ) {}

  public fullpageGrid = UICardsGridType.fullpage;

  public isLoading$ = new BehaviorSubject<boolean>(true);

  public setPage(newPage: number): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: newPage },
      queryParamsHandling: 'merge',
    });
  }

  public results$ = this.route.queryParams.pipe(
    tap(() => this.isLoading$.next(true)),
    switchMap(params => this.moviesApiService.requestMovies(params)),
    tap(() => this.isLoading$.next(false))
  );
}
