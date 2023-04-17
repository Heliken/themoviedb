import { Component } from '@angular/core';
import { DetailedDataAPIService } from '../../services/detailed-data-api.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { crewFilterFunc } from 'src/app/components/detailed-page/helpers/crew-filter-func';

enum MovieCrewMainJob {
  Director = 'director',
  Novel = 'novel',
  Screenplay = 'screenplay',
  Story = 'story',
  Writer = 'writer',
}

@Component({
  selector: 'mdb-movie-details',
  templateUrl: './movie-details.component.html',
})
export class MovieDetailsComponent {
  constructor(
    private route: ActivatedRoute,
    private detailedDataService: DetailedDataAPIService
  ) {}

  public castToShow = 10;

  public isLoading$ = new BehaviorSubject<boolean>(true);

  public crewFilterFunc = crewFilterFunc([
    MovieCrewMainJob.Director,
    MovieCrewMainJob.Novel,
    MovieCrewMainJob.Screenplay,
    MovieCrewMainJob.Story,
    MovieCrewMainJob.Writer,
  ]);

  public details$ = this.route.params.pipe(
    tap(() => this.isLoading$.next(true)),
    switchMap(params =>
      this.detailedDataService.requestMovieDetailedData(params['id'])
    ),
    tap(() => this.isLoading$.next(false))
  );
}
