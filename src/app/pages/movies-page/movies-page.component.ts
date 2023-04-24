import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesPageApiService } from './movies-page-api.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'mdb-movies-page',
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.scss'],
})
export class MoviesPageComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private moviesApiService: MoviesPageApiService
  ) {}

  public setPage(newPage: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: newPage },
      queryParamsHandling: 'merge',
    });
  }

  public results$ = this.route.queryParams.pipe(
    switchMap(params => this.moviesApiService.requestMovies(params))
  );
}
