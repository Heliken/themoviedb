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
    console.log('setReleaseDate');
    this.setQueryParams({
      page: undefined,
      ['release_date.gte']: min,
      ['release_date.lte']: max,
    });
  }

  public setGenres(genres: GenresQueryParam) {
    this.setQueryParams({
      page: undefined,
      with_genres: genres && genres.length ? genres.join(',') : undefined,
    });
  }

  // used as source of state of the page, only patches value to formGroup to correctly update UI
  public results$ = this.route.queryParams.pipe(
    tap(() => this.isLoading$.next(true)),
    tap(params => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // todo: move all params to some sort of enum, find a way to map params before passing to controlsFomrGroup
      const releaseDate = {
        min: params['release_date.gte'],
        max: params['release_date.lte'],
      };
      this.controlsFormGroup.patchValue(
        {
          ...params,
          releaseDate,
          genres: params['with_genres']
            ? params['with_genres']
                .split(',')
                .map((val: string) => parseInt(val))
            : null,
        },
        { emitEvent: false }
      );
    }),
    switchMap(params => this.moviesApiService.requestMovies(params)),
    distinctUntilChanged(),
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
