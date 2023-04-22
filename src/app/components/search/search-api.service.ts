import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DtoTransformService } from 'src/app/services/dto-transform.service';
import { MediaItemDTOWithType } from 'src/app/types/DTO/media-item-dto';
import { MediaListResponse } from 'src/app/types/media-list-response';
import { MediaItem } from 'src/app/types/media-item';
import { MediaType } from 'src/app/types/media-type';
@Injectable({
  providedIn: 'root',
})
export class SearchApiService {
  constructor(
    private readonly http: HttpClient,
    private readonly dtoTranform: DtoTransformService
  ) {}

  requestSearchResult(searchString: string): Observable<MediaItem[]> {
    const params = new HttpParams({
      fromObject: {
        query: searchString,
      },
    });

    const searchResult$ = this.http.get<
      MediaListResponse<MediaItemDTOWithType>
    >(`search/multi`, {
      params,
    });

    return this.transformDTO(searchResult$);
  }

  private transformDTO(
    searchResult: Observable<MediaListResponse<MediaItemDTOWithType>>
  ): Observable<MediaItem[]> {
    return searchResult.pipe(
      map(({ results }) =>
        results.map(mediaItem => {
          switch (mediaItem.media_type) {
            case MediaType.Person:
              return this.dtoTranform.transformPerson(mediaItem);
            case MediaType.Movie:
              return this.dtoTranform.transformMovie(mediaItem);
            case MediaType.Tv:
              return this.dtoTranform.transformTVShow(mediaItem);
          }
        })
      )
    );
  }
}
