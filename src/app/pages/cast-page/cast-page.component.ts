import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  tap,
  switchMap,
  Observable,
  combineLatest,
} from 'rxjs';
import { DetailedDataAPIService } from 'src/app/services/detailed-data-api.service';
import { CastPageRouteData } from 'src/app/types/cast-page-route-data';
import { MediaType } from 'src/app/types/media-type';
@Component({
  selector: 'mdb-cast-page',
  templateUrl: './cast-page.component.html',
  styleUrls: ['./cast-page.component.scss'],
})
export class CastPageComponent {
  constructor(
    private route: ActivatedRoute,
    private detailedDataService: DetailedDataAPIService
  ) {}

  public isLoading$ = new BehaviorSubject<boolean>(true);

  public details$ = combineLatest([
    this.route.params,
    this.route.data as Observable<CastPageRouteData>,
  ]).pipe(
    tap(() => this.isLoading$.next(true)),
    switchMap(([params, data]) => {
      const id = params['id'];
      const mediaType = data['mediaType'];

      switch (mediaType) {
        case MediaType.Movie:
          return this.detailedDataService.requestMovieDetailedData(id);
        case MediaType.Tv:
          return this.detailedDataService.requestTvShowDetailedData(id);
      }
    }),
    tap(() => this.isLoading$.next(false))
  );
}
