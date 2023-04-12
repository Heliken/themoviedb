import { Injectable } from '@angular/core';
import { GridMediaItem } from '../types/ui-types/grid-media-item';
import { MediaType } from '../types/media-type';
import { Movie } from '../types/movie';
import { Person } from '../types/person';
import { TvShow } from '../types/tv-show';

@Injectable({
  providedIn: 'root',
})
export class MediaToGridMediaService {
  public convert(media: Person | TvShow | Movie): GridMediaItem {
    switch (media.mediaType) {
      case MediaType.Person:
        return this.personMapper(media);
      case MediaType.Movie:
        return this.movieMapper(media);
      case MediaType.Tv:
        return this.tvShowMapper(media);
    }
  }

  private personMapper(person: Person): GridMediaItem {
    const { id, name, photo, mediaType } = person;
    return {
      id,
      title: name,
      type: mediaType,
      image: photo,
    };
  }

  private movieMapper(movie: Movie): GridMediaItem {
    const { id, poster, title, mediaType, releaseDate, rating } = movie;
    return {
      id,
      title,
      type: mediaType,
      releaseDate,
      rating,
      image: poster,
    };
  }

  private tvShowMapper(tvShow: TvShow): GridMediaItem {
    const { id, poster, title, mediaType, releaseDate, rating } = tvShow;
    return {
      id,
      title,
      type: mediaType,
      releaseDate,
      rating,
      image: poster,
    };
  }
}
