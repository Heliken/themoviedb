import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, map, mergeMap, reduce } from 'rxjs';
import { DtoTransformService } from 'src/app/services/dto-transform.service';
import { MediaItemDTOWithType } from 'src/app/types/DTO/media-item-dto';
import { MediaListResponse } from 'src/app/types/media-list-response';
import { MediaType } from 'src/app/types/media-type';
import { MediaTypeDTO } from 'src/app/types/DTO/media-item-dto';
import { MediaItem } from 'src/app/types/media-item';
import { SearchResponse } from './types/search-response';

@Injectable({
  providedIn: 'root',
})
export class SearchApiService {
  constructor(
    private readonly http: HttpClient,
    private readonly dtoTranform: DtoTransformService
  ) {}

  requestSearchResult(searchString: string): Observable<SearchResponse> {
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

    return this.groupByType(this.transformDTO(searchResult$));
  }

  private transformDTO(
    searchResult: Observable<MediaListResponse<MediaItemDTOWithType>>
  ): Observable<MediaItem[]> {
    return searchResult.pipe(
      map(({ results }) =>
        results.map(mediaItem => {
          switch (mediaItem.media_type) {
            case MediaTypeDTO.Person:
              return this.dtoTranform.transformPerson(mediaItem);
            case MediaTypeDTO.Movie:
              return this.dtoTranform.transformMovie(mediaItem);
            case MediaTypeDTO.Tv:
              return this.dtoTranform.transformTVShow(mediaItem);
          }
        })
      )
    );
  }

  private groupByType(transformedSearchResult: Observable<MediaItem[]>) {
    const mappedSearch: SearchResponse = {
      [MediaType.Movie]: [],
      [MediaType.Tv]: [],
      [MediaType.Person]: [],
    };

    return transformedSearchResult.pipe(
      mergeMap((mediaItems: MediaItem[]) => from(mediaItems)),
      reduce((acc, item) => {
        switch (item.mediaType) {
          case MediaType.Movie:
            acc[MediaType.Movie].push(item);
            break;
          case MediaType.Tv:
            acc[MediaType.Tv].push(item);
            break;
          case MediaType.Person:
            acc[MediaType.Person].push(item);
            break;
        }
        return acc;
      }, mappedSearch)
    );
  }
}
