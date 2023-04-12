import { Injectable } from '@angular/core';

import { MediaItemDetailed } from '../types/media-item';

import { DetailedHero } from '../types/ui-types/detailed-hero';
import { TvShowDetailed } from '../types/tv-show';
import { MovieDetailed } from '../types/movie';

@Injectable({
  providedIn: 'root',
})
export class MediaDetailedToDetailedService {
  public convertToHero(media: MediaItemDetailed): DetailedHero {
    return this.movieTvHeroMapper(media);
  }

  movieTvHeroMapper({
    title,
    mediaType,
    releaseDate,
    description,
    rating,
    genres,
    poster,
    background,
  }: TvShowDetailed | MovieDetailed): DetailedHero {
    console.log(rating);
    return {
      img: poster,
      title,
      mediaType,
      date: releaseDate,
      description,
      rating,
      genres,
      background,
    };
  }
}
