import { Component } from '@angular/core';
import { MovieTvDetailsAPIService } from './movie-tv-details.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, map, switchMap, tap } from 'rxjs';
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
    private movieTvDetailsService: MovieTvDetailsAPIService
  ) {}

  details$: Observable<MediaItemDetailed> = combineLatest([
    this.route.params.pipe(map(params => params['detailedPageType'])),
    this.route.params.pipe(map(params => params['id'])),
  ]).pipe(
    switchMap(([type, id]: [DetailedPageType, number]) => {
      switch (type) {
        case MediaType.Movie:
          return this.movieTvDetailsService.requestMovieDetailedData(id);
        case MediaType.Tv:
          return this.movieTvDetailsService.requestTvShowDetailedData(id);
      }
    })
  );
}
