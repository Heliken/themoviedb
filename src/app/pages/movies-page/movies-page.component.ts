import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MoviesPageApiService } from './movies-page-api.service';
import { BehaviorSubject, Subscription, switchMap, tap } from 'rxjs';
import { UICardsGridType } from '../../types/ui-types/ui-cards-grid-type';
import { SortType } from './types/sort-types';
import { defaultSortOption, sortingOptions } from './configs/sort-config';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'mdb-movies-page',
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.scss'],
})
export class MoviesPageComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private moviesApiService: MoviesPageApiService,
    private formBuilder: FormBuilder
  ) {}

  public controlsFormGroup = this.formBuilder.group({
    sort_by: new FormControl<SortType>(defaultSortOption),
    page: new FormControl<number>(1),
  });

  public fullpageGrid = UICardsGridType.fullpage;
  public sortingOptions = sortingOptions;

  public isLoading$ = new BehaviorSubject<boolean>(true);

  private controlsSubscription?: Subscription;

  public setPage(page: number): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.controlsFormGroup.patchValue({ page: page });
  }

  public results$ = this.route.queryParams.pipe(
    tap(() => this.isLoading$.next(true)),
    tap(params => this.controlsFormGroup.patchValue(params)),
    switchMap(params => this.moviesApiService.requestMovies(params)),
    tap(() => this.isLoading$.next(false))
  );

  public ngOnInit(): void {
    this.controlsSubscription = this.controlsFormGroup.valueChanges.subscribe(
      params => this.setQueryParams(params)
    );
  }

  public setQueryParams(params: Params) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }

  public ngOnDestroy(): void {
    if (this.controlsSubscription) {
      this.controlsSubscription.unsubscribe();
    }
  }
}
