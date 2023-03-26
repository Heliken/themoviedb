import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { TrendingTimeWindow, TrendingType } from "../../types/trending-request"
import { MediaListResponse } from 'src/app/types/media-list-response';
import { MediaItem } from 'src/app/types/media-item';

@Injectable({
  providedIn: 'root'
})
export class MainpageRequestsService {
  constructor(private readonly http: HttpClient) {}

  requestTrending(
    timeWindow: TrendingTimeWindow = TrendingTimeWindow.day,
    type: TrendingType = TrendingType.all
  ) {
    return this.http
      .get<MediaListResponse<MediaItem>>(`/api/trending/${type}/${timeWindow}`)
      .pipe(map(({results}) => results));
  }

  requestPopular() {
    return this.http
      .get<MediaListResponse<MediaItem>>("/api/movie/popular")
      .pipe(map(({results}) => results));
  }

  requestUpcoming() {
    return this.http
      .get<MediaListResponse<MediaItem>>("/api/movie/upcoming")
      .pipe(map(({results}) => results));
  }
}
