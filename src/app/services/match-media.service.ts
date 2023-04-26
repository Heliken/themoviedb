import { Injectable } from '@angular/core';
import { MediaQuery, MediaQueryResponse } from '../types/ui-types/media-query';
import { Observable, startWith } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class MatchMediaService {
  observe(mediaQueries: MediaQuery[]): Observable<MediaQueryResponse> {
    const initialValue = mediaQueries.reduce(
      (acc, { key, query }) => ({
        ...acc,
        [key]: window.matchMedia(query).matches,
      }),
      {}
    );

    const mediaValues$ = new Observable<MediaQueryResponse>(observer => {
      const mediaQueryLists = mediaQueries.map(({ query }) =>
        window.matchMedia(query)
      );

      const handler = () => {
        const newValue = mediaQueryLists.reduce(
          (acc, mediaQueryList, index) => ({
            ...acc,
            [mediaQueries[index].key]: mediaQueryList.matches,
          }),
          {}
        );
        observer.next(newValue);
      };

      mediaQueryLists.forEach(mediaQueryList => {
        mediaQueryList.addEventListener('change', handler);
      });

      return () => {
        mediaQueryLists.forEach(mediaQueryList => {
          mediaQueryList.removeEventListener('change', handler);
        });
      };
    });

    return mediaValues$.pipe(startWith(initialValue));
  }
}
