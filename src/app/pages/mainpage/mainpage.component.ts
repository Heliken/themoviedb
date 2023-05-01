import { Component } from '@angular/core';
import { MainpageRequestsService } from './mainpage-api.service';
import { MainpageSection } from './types/mainpage-section';
import { FavouritesService } from '../../services/favourites.service';
import { combineLatest, map } from 'rxjs';
import { UICardsGridType } from '../../types/ui-types/ui-cards-grid-type';
@Component({
  selector: 'mdb-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss'],
})
export class MainpageComponent {
  constructor(
    private readonly api: MainpageRequestsService,
    private favouritesService: FavouritesService
  ) {}

  public favouritesGridType = UICardsGridType.default;

  public sections: MainpageSection[] = [
    {
      title: 'Trending',
      list$: this.api.requestTrending(),
      gridType: UICardsGridType.mobileScroll,
    },
    {
      title: 'Popular',
      list$: this.api.requestPopular(),
      gridType: UICardsGridType.mobileScroll,
    },
    {
      title: 'Upcoming',
      list$: this.api.requestUpcoming(),
      gridType: UICardsGridType.mobileScroll,
    },
  ];

  public favouriteMovies$ = this.favouritesService.favMovies$.pipe(
    map(movie => Array.from(movie.values()))
  );

  public favouriteTvShows$ = this.favouritesService.favTvShows$.pipe(
    map(movie => Array.from(movie.values()))
  );

  public favourites$ = combineLatest([
    this.favouriteMovies$,
    this.favouriteTvShows$,
  ]).pipe(map(([movies, tv]) => [...movies, ...tv]));
}
