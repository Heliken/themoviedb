import { Component } from '@angular/core';
import { DetailedDataAPIService } from '../../services/detailed-data-api.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { crewFilterFunc } from 'src/app/components/detailed-page/helpers/crew-filter-func';
@Component({
  selector: 'mdb-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent {
  constructor(
    private route: ActivatedRoute,
    private detailedDataService: DetailedDataAPIService
  ) {}

  public castToShow = 10;

  public isLoading$ = new BehaviorSubject<boolean>(true);

  public crewFilterFunc = crewFilterFunc([
    'director',
    'novel',
    'screenplay',
    'story',
    'writer',
  ]);

  public details$ = this.route.params.pipe(
    tap(() => this.isLoading$.next(true)),
    switchMap(params =>
      this.detailedDataService.requestMovieDetailedData(params['id'])
    ),
    tap(() => this.isLoading$.next(false))
  );
}
