import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesPageApiService } from './movies-page-api.service';
import { BehaviorSubject, Subscription, switchMap, tap } from 'rxjs';
import { UICardsGridType } from '../../types/ui-types/ui-cards-grid-type';
import { SortType } from './types/sort-types';
import { defaultSortOption, sortingOptions } from './configs/sort-config';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'mdb-movies-page',
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.scss'],
})
export class MoviesPageComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private moviesApiService: MoviesPageApiService
  ) {}

  public fullpageGrid = UICardsGridType.fullpage;
  public sortingOptions = sortingOptions;
  public sortFormControl = new FormControl<SortType | null>(defaultSortOption);

  public isLoading$ = new BehaviorSubject<boolean>(true);

  private sortSubscription?: Subscription;

  public setPage(newPage: number): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: newPage },
      queryParamsHandling: 'merge',
    });
  }

  public setSorting(sort_by: SortType | null): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        sort_by,
        page: 1,
      },
      queryParamsHandling: 'merge',
    });
  }

  public results$ = this.route.queryParams.pipe(
    tap(() => this.isLoading$.next(true)),
    tap(params => this.setSortFormControlValue(params['sort_by'])),
    switchMap(params => this.moviesApiService.requestMovies(params)),
    tap(() => this.isLoading$.next(false))
  );

  public setSortFormControlValue(sortType: SortType | null): void {
    if (sortType && sortType !== this.sortFormControl.value) {
      this.sortFormControl.patchValue(sortType);
    }
  }

  public ngOnInit(): void {
    this.sortSubscription = this.sortFormControl.valueChanges.subscribe(res => {
      this.setSorting(res);
    });
  }

  public ngOnDestroy(): void {
    if (this.sortSubscription) {
      this.sortSubscription.unsubscribe();
    }
  }
}
