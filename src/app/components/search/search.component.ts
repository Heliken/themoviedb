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
import { SearchSection } from './types/search-section';
import { FormControl } from '@angular/forms';
import { MediaItem } from 'src/app/types/media-item';
import { MediaType } from 'src/app/types/media-type';
import { FilterFunc } from 'src/app/pipes/filter/filter.pipe';

@Component({
  selector: 'mdb-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  constructor(private searchApi: SearchApiService) {}

  public searchInput = new FormControl();
  public debounceTime = 200;
  public minSearchLength = 3;
  public isLoading$ = new BehaviorSubject<boolean>(true);

  public searchSections: SearchSection[] = [
    { type: MediaType.Movie, title: 'Movies' },
    { type: MediaType.Tv, title: 'TV Shows' },
    { type: MediaType.Person, title: 'Persons' },
  ];

  public filterFunc(mediaType: MediaType): FilterFunc<MediaItem> {
    return (item: MediaItem) => item.mediaType === mediaType;
  }

  public showSearch$: Observable<boolean> = this.searchInput.valueChanges.pipe(
    map(value => (value ?? '').length >= this.minSearchLength)
  );

  public searchResults$: Observable<MediaItem[]> =
    this.searchInput.valueChanges.pipe(
      filter(Boolean),
      filter(value => value.length >= this.minSearchLength),
      tap(() => this.isLoading$.next(true)),
      debounceTime(this.debounceTime),
      switchMap(value => this.searchApi.requestSearchResult(value)),
      tap(() => this.isLoading$.next(false))
    );

  public clear() {
    this.searchInput.setValue('');
  }
}
