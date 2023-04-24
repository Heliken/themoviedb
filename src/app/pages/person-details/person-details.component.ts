import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, tap, switchMap } from 'rxjs';
import { countPopularity } from 'src/app/helpers/popularity-formula';
import { SortFunc } from 'src/app/pipes/sort/sort.pipe';
import { DetailedDataAPIService } from 'src/app/services/detailed-data-api.service';
import { KnownFor } from 'src/app/types/person';

@Component({
  selector: 'mdb-person-details',
  templateUrl: './person-details.component.html',
})
export class PersonDetailsComponent {
  constructor(
    private route: ActivatedRoute,
    private detailedDataService: DetailedDataAPIService
  ) {}

  public isLoading$ = new BehaviorSubject<boolean>(true);

  public knownForToShow = 8;

  public knownForSortFunc: SortFunc<KnownFor> = (a, b) =>
    countPopularity(b) - countPopularity(a);

  public details$ = this.route.params.pipe(
    tap(() => this.isLoading$.next(true)),
    switchMap(params =>
      this.detailedDataService.requestPersonDetailedData(params['id'])
    ),
    tap(() => this.isLoading$.next(false))
  );
}
