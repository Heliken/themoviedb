import { Injectable } from '@angular/core';
import { MovieDTO } from '../types/DTO/movie-dto';
import { PersonDTO } from '../types/DTO/person-dto';
import { TvShowDTO } from '../types/DTO/tv-show-dto';
import { MediaType } from '../types/media-type';
import { Movie } from '../types/movie';
import { Person } from '../types/person';
import { TvShow } from '../types/tv-show';

@Injectable({
  providedIn: 'root',
})
export class DtoTransformService {
  transformPerson({ id, profile_path, name }: PersonDTO): Person {
    return {
      name,
      id,
      photo: profile_path,
      mediaType: MediaType.Person,
    };
  }

  transformMovie({
    id,
    title,
    poster_path,
    vote_average,
    release_date,
  }: MovieDTO): Movie {
    return {
      id,
      title,
      poster: poster_path,
      rating: vote_average,
      releaseDate: release_date,
      mediaType: MediaType.Movie,
    };
  }

  transformTVShow({
    id,
    name,
    poster_path,
    vote_average,
    first_air_date,
  }: TvShowDTO): TvShow {
    return {
      id,
      title: name,
      poster: poster_path,
      rating: vote_average,
      releaseDate: new Date(first_air_date),
      mediaType: MediaType.Tv,
    };
  }
}
