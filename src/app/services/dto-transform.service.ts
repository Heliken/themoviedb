import { Injectable } from '@angular/core';
import { MovieDTO } from '../types/DTO/movie-dto';
import { PersonDTO } from '../types/DTO/person-dto';
import { TvShowDTO } from '../types/DTO/tv-show-dto';
import { MediaType } from '../types/media-type';
import { Movie } from '../types/movie';
import { Person } from '../types/person';
import { TvShow } from '../types/tv-show';
import { ApiGenresService } from './api-genres.service';
import { Genre } from '../types/genres';

@Injectable({
  providedIn: 'root',
})
export class DtoTransformService {
  constructor(private apiGenresService: ApiGenresService) {}
  transformPerson(dtoPerson: PersonDTO): Person {
    const { id, profile_path, name } = dtoPerson;

    return {
      name,
      id,
      photo: profile_path,
      mediaType: MediaType.Person,
    };
  }

  transformMovie(dtoMovie: MovieDTO): Movie {
    const { id, title, poster_path, vote_average, release_date, genre_ids } =
      dtoMovie;

    return {
      id,
      title,
      poster: poster_path,
      rating: vote_average,
      releaseDate: release_date,
      mediaType: MediaType.Movie,
      genres: this.mapGenres(genre_ids, MediaType.Movie),
    };
  }

  transformTVShow(dtoMovie: TvShowDTO): TvShow {
    const { id, name, poster_path, vote_average, first_air_date, genre_ids } =
      dtoMovie;

    return {
      id,
      title: name,
      poster: poster_path,
      rating: vote_average,
      releaseDate: new Date(first_air_date),
      mediaType: MediaType.Tv,
      genres: this.mapGenres(genre_ids, MediaType.Tv),
    };
  }

  private mapGenres(
    genreIds: number[],
    type: MediaType.Movie | MediaType.Tv
  ): Genre[] {
    const apiGenres = this.apiGenresService.getGenres();
    if (apiGenres) {
      const genresList =
        apiGenres[type === MediaType.Movie ? 'movie' : 'tvShows'];

      const mappedGenres = genreIds.reduce((acc, genreId) => {
        const genre = genresList.find(({ id }) => id === genreId);

        if (genre !== undefined) {
          acc.push(genre);
        }
        return acc;
      }, [] as Genre[]);

      return mappedGenres;
    }

    return [];
  }
}
