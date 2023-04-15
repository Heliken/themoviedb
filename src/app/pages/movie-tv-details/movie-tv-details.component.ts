import { Component } from '@angular/core';
import { DetailedDataAPIService } from '../../services/detailed-data-api.service';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  distinctUntilChanged,
  map,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs';
import { MediaItemDetailed } from 'src/app/types/media-item';
import { MediaType } from 'src/app/types/media-type';
import { DetailedPageType } from 'src/app/types/detailed-page';
@Component({
  selector: 'mdb-movie-tv-details',
  templateUrl: './movie-tv-details.component.html',
  styleUrls: ['./movie-tv-details.component.scss'],
})
export class MovieTvDetailsComponent {
  constructor(
    private route: ActivatedRoute,
    private detailedDataService: DetailedDataAPIService
  ) {}

  public isLoading$ = new BehaviorSubject<boolean>(true);

  details$ = this.route.params.pipe(
    tap(() => this.isLoading$.next(true)),
    switchMap(params => {
      const type: DetailedPageType = params['detailedPageType'];
      const id = params['id'];
      switch (type) {
        case MediaType.Movie:
          return this.detailedDataService.requestMovieDetailedData(id);
        case MediaType.Tv:
          return this.detailedDataService.requestTvShowDetailedData(id);
      }
    }),
    tap(() => this.isLoading$.next(false))
  );
}
