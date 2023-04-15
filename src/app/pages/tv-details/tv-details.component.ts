import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, tap, switchMap } from 'rxjs';
import { DetailedDataAPIService } from 'src/app/services/detailed-data-api.service';
import { DetailedPageType } from 'src/app/types/detailed-page';
import { MediaType } from 'src/app/types/media-type';

@Component({
  selector: 'mdb-tv-details',
  templateUrl: './tv-details.component.html',
  styleUrls: ['./tv-details.component.scss'],
})
export class TvDetailsComponent {
  constructor(
    private route: ActivatedRoute,
    private detailedDataService: DetailedDataAPIService
  ) {}

  public isLoading$ = new BehaviorSubject<boolean>(true);

  public details$ = this.route.params.pipe(
    tap(() => this.isLoading$.next(true)),
    switchMap(params =>
      this.detailedDataService.requestTvShowDetailedData(params['id'])
    ),
    tap(() => this.isLoading$.next(false))
  );
}
