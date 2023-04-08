import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DtoTransformService } from 'src/app/services/dto-transform.service';
import { MediaItemDTOWithType } from 'src/app/types/DTO/media-item-dto';
import { MediaListResponse } from 'src/app/types/media-list-response';
import { MediaType } from 'src/app/types/media-type';
import { MediaTypeDTO } from 'src/app/types/DTO/media-item-dto';
import { MediaItem } from 'src/app/types/media-item';
import {
  SearchResponse,
  SearchResponseSectionTitle,
} from './types/search-response';
@Injectable({
  providedIn: 'root',
})
export class SearchApiService {
  constructor(
    private readonly http: HttpClient,
    private readonly dtoTranform: DtoTransformService
  ) {}

  private sectionTitles: SearchResponseSectionTitle = {
    [MediaType.Movie]: 'Movies',
    [MediaType.Tv]: 'TV Shows',
    [MediaType.Person]: 'People',
  };

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
    return transformedSearchResult.pipe(
      map(mediaItems => {
        const mappedSearch: SearchResponse = {
          response: [
            {
              type: MediaType.Movie,
              result: [],
              title: this.sectionTitles[MediaType.Movie],
            },
            {
              type: MediaType.Tv,
              result: [],
              title: this.sectionTitles[MediaType.Tv],
            },
            {
              type: MediaType.Person,
              result: [],
              title: this.sectionTitles[MediaType.Person],
            },
          ],
          total: mediaItems.length,
        };

        mediaItems.forEach(mediaItem => {
          const relatedSection = mappedSearch.response.find(
            ({ type }) => type === mediaItem.mediaType
          );

          if (relatedSection) {
            relatedSection.result.push(mediaItem);
          }
        });

        return mappedSearch;
      })
    );
  }
}
