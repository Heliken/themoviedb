import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DtoTransformService } from '../../services/dto-transform.service';
import { MovieDTO } from '../../types/DTO/movie-dto';
import { MediaListResponse } from '../../types/media-list-response';
import { Params } from '@angular/router';
import { Observable, map } from 'rxjs';
import { DISCOVER_MAX_PAGE } from '../../../api-info';
import { DiscoverResponse } from '../../types/discover-response';
import { Movie } from '../../types/movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesPageApiService {
  constructor(
    private readonly http: HttpClient,
    private readonly dtoTranform: DtoTransformService
  ) {}

  requestMovies(pageParams: Params): Observable<DiscoverResponse<Movie>> {
    const { page, ...restParams } = pageParams;
    const params = new HttpParams({
      fromObject: {
        page: this.pageGuard(page),
        ...restParams,
      },
    });
    return this.http
      .get<MediaListResponse<MovieDTO>>('discover/movie', {
        params,
      })
      .pipe(map(res => this.dtoTranform.transformDiscoverResponse(res)));
  }

  pageGuard(page: string) {
    const convertedPageNumber = parseInt(page);

    if (isNaN(convertedPageNumber)) return 1;
    if (convertedPageNumber < 1) return 1;
    return Math.min(convertedPageNumber, DISCOVER_MAX_PAGE);
  }
}
