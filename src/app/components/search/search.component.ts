import { Component, OnInit } from '@angular/core';
import { Observable, Subject, debounceTime, tap } from 'rxjs';
import { SearchApiService } from './search-api.service';
import { SearchResponse } from './types/search-response';

@Component({
  selector: 'mdb-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  constructor(private searchApi: SearchApiService) {}

  public search$ = new Subject<string>();
  public results$ = new Observable<SearchResponse>();
  public debounceTime = 200;
  public minSearchLength = 3;
  public hasMinInput = false;

  public onInput(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      const searchString = event.target.value.trim();
      if (searchString.length >= this.minSearchLength) {
        this.search$.next(event.target.value.trim());
        this.showSearchOverlay();
      } else {
        this.hideSearchOverlay();
      }
    }
  }

  public showSearchOverlay() {
    this.hasMinInput = true;
  }

  public hideSearchOverlay() {
    this.hasMinInput = false;
  }

  public clear() {
    this.hasMinInput = false;
  }

  public onFocus(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      const searchString = event.target.value.trim();
      if (searchString.length >= this.minSearchLength) {
        this.showSearchOverlay();
      }
    }
  }

  public ngOnInit(): void {
    this.search$
      .pipe(debounceTime(this.debounceTime))
      .subscribe(
        searchString =>
          (this.results$ = this.searchApi.requestSearchResult(searchString))
      );
  }
}
