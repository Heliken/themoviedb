import { Component } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs';
import { SearchApiService } from './search-api.service';
import { SearchResponse } from './types/search-response';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'mdb-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  constructor(private searchApi: SearchApiService) {}

  public searchInput = new FormControl();
  public searchResult?: SearchResponse;
  public debounceTime = 1000;
  public minSearchLength = 3;
  public isLoading$ = new BehaviorSubject<boolean>(true);

  public showSearch$: Observable<boolean> = this.searchInput.valueChanges.pipe(
    map(value => (value ?? '').length >= this.minSearchLength)
  );

  public searchResults$: Observable<SearchResponse> =
    this.searchInput.valueChanges.pipe(
      tap(value => console.log(value)),
      filter(Boolean),
      filter(value => value.length >= this.minSearchLength),
      debounceTime(this.debounceTime),
      distinctUntilChanged(),

      switchMap(value => this.searchApi.requestSearchResult(value))
    );

  public clear() {
    this.searchInput.setValue('');
  }

  // public ngOnInit(): void {
  //   this.searchInput.valueChanges
  //     .pipe(
  //       tap(() => (this.searchResult = undefined)),
  //       debounceTime(this.debounceTime),
  //       filter(val => val.length >= this.minSearchLength)
  //     )
  //     .subscribe(searchString => {
  //       this.searchApi
  //         .requestSearchResult(searchString)
  //         .subscribe(result => (this.searchResult = result));
  //     });
  // }
}
