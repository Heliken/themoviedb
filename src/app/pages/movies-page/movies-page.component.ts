import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MoviesPageApiService } from './movies-page-api.service';
import { BehaviorSubject, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { UICardsGridType } from '../../types/ui-types/ui-cards-grid-type';
import { SortType } from './types/sort-types';
import { defaultSortOption, sortingOptions } from './configs/sort-config';
import { FormBuilder, FormControl } from '@angular/forms';
import { DaterangeForm, DaterangeValue } from '../../types/ui-types/daterange';
import { GenresQueryParam } from '../../types/ui-types/genres-form-control';
import { queryParamsKeys } from './configs/query-params-keys';

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
    releaseDate: this.formBuilder.group<DaterangeForm>({
      min: new FormControl<string | null>(null),
      max: new FormControl<string | null>(null),
    }),
    genres: new FormControl<GenresQueryParam>(null),
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

  public setReleaseDate({ min, max }: DaterangeValue) {
    this.setQueryParams({
      page: undefined,
      [queryParamsKeys.releaseDate.min]: min,
      [queryParamsKeys.releaseDate.max]: max,
    });
  }

  public setGenres(genres: GenresQueryParam) {
    this.setQueryParams({
      page: undefined,
      [queryParamsKeys.genres]:
        genres && genres.length ? genres.join(',') : undefined,
    });
  }

  // used as source of state of the page, only patches value to formGroup to correctly update UI
  public results$ = this.route.queryParams.pipe(
    tap(() => this.isLoading$.next(true)),
    tap(params => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.controlsFormGroup.patchValue(
        {
          ...this.mapQueryParamsToFormGroup(params),
        },
        { emitEvent: false }
      );
    }),
    switchMap(params => this.moviesApiService.requestMovies(params)),
    distinctUntilChanged(),
    tap(() => this.isLoading$.next(false))
  );

  public mapQueryParamsToFormGroup(params: Params) {
    return {
      releaseDate: {
        min: params[queryParamsKeys.releaseDate.min],
        max: params[queryParamsKeys.releaseDate.max],
      },
      genres: params[queryParamsKeys.genres]
        ? params[queryParamsKeys.genres]
            .split(',')
            .map((val: string) => parseInt(val))
        : null,
      ...params,
    };
  }

  public setQueryParams(params: Params) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }
}
