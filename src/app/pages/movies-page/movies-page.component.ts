import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MoviesPageApiService } from './movies-page-api.service';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { UICardsGridType } from '../../types/ui-types/ui-cards-grid-type';
import { SortType } from './types/sort-types';
import { defaultSortOption, sortingOptions } from './configs/sort-config';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'mdb-movies-page',
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.scss'],
})
export class MoviesPageComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private moviesApiService: MoviesPageApiService,
    private formBuilder: FormBuilder
  ) {}

  // used only to store values for UI
  public controlsFormGroup = this.formBuilder.group({
    sort_by: new FormControl<SortType>(defaultSortOption),
  });

  public fullpageGrid = UICardsGridType.fullpage;
  public sortingOptions = sortingOptions;

  public isLoading$ = new BehaviorSubject<boolean>(true);

  public setPage(page: number): void {
    this.setQueryParams({ page });
  }

  public setSorting(sort_by: string): void {
    this.setQueryParams({ page: undefined, sort_by });
  }

  // used as source of state of the page, only patches value to formGroup to correctly update UI
  public results$ = this.route.queryParams.pipe(
    tap(() => this.isLoading$.next(true)),
    tap(params => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.controlsFormGroup.patchValue(params);
    }),
    switchMap(params => this.moviesApiService.requestMovies(params)),
    tap(() => this.isLoading$.next(false))
  );

  public setQueryParams(params: Params) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }
}
