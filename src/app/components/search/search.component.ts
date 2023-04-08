import { Component, OnInit } from '@angular/core';
import { debounceTime, filter, tap } from 'rxjs';
import { SearchApiService } from './search-api.service';
import { SearchResponse } from './types/search-response';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'mdb-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  constructor(private searchApi: SearchApiService) {}

  public searchInput = new FormControl();
  public searchResult?: SearchResponse;
  public debounceTime = 200;
  public minSearchLength = 3;

  public clear() {
    this.searchInput.setValue('');
    this.searchResult = undefined;
  }

  public ngOnInit(): void {
    this.searchInput.valueChanges
      .pipe(
        tap(() => (this.searchResult = undefined)),
        debounceTime(this.debounceTime),
        filter(val => val.length >= this.minSearchLength)
      )
      .subscribe(searchString => {
        this.searchApi
          .requestSearchResult(searchString)
          .subscribe(result => (this.searchResult = result));
      });
  }
}
