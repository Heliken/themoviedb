import { Injectable } from '@angular/core';
import { MovieDTO, MovieDTODetailed } from '../types/DTO/movie-dto';
import {
  KnownForAsCastDTO,
  KnownForAsCrewDTO,
  KnownForDTO,
  PersonDTO,
  PersonDTODetailed,
  PersonDTODetailedCombinedCredits,
} from '../types/DTO/person-dto';
import {
  TvShowCreatorDTO,
  TvShowDTO,
  TvShowDTODetailed,
} from '../types/DTO/tv-show-dto';
import { MediaType } from '../types/media-type';
import { Movie, MovieDetailed } from '../types/movie';
import {
  KnownFor,
  KnownForAsCreditsDetails,
  Person,
  PersonDetailed,
  PersonDetailsCombinedCredits,
} from '../types/person';
import { TvShow, TvShowDetailed } from '../types/tv-show';
import { CastDTO, CastDetailsDTO, CreditsDTO } from '../types/DTO/credits-dto';
import { Cast, CastDetails, Credits } from '../types/credits';
import { MovieTVDetails } from '../types/movie-tv-details';
import { MovieTVDetailsDTO } from '../types/DTO/movie-tv-details-dto';

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

  transformCastPerson(cast: CastDTO): Cast {
    return {
      ...this.transformPerson(cast),
      ...this.transformCastDetails(cast),
    };
  }

  transformCastDetails({
    cast_id,
    character,
    credit_id,
    order,
    department,
    known_for_department,
    job,
  }: CastDetailsDTO): CastDetails {
    return {
      castId: cast_id,
      character,
      creditId: credit_id,
      order,
      department: department || known_for_department,
      job,
    };
  }

  transformMovie({
    id,
    title,
    poster_path,
    vote_average,
    release_date,
    overview,
    backdrop_path,
    popularity,
    vote_count,
  }: MovieDTO): Movie {
    return {
      id,
      title,
      poster: poster_path,
      rating: vote_average,
      releaseDate: release_date ? new Date(release_date) : undefined,
      mediaType: MediaType.Movie,
      description: overview,
      background: backdrop_path,
      popularity,
      voteCount: vote_count,
    };
  }

  transformMovieDetailed(movieDetailed: MovieDTODetailed): MovieDetailed {
    return {
      ...this.transformMovie(movieDetailed),
      ...this.transformMovieTvDetails(movieDetailed),
    };
  }

  transformTVShow({
    id,
    name,
    poster_path,
    vote_average,
    first_air_date,
    overview,
    backdrop_path,
    popularity,
    vote_count,
  }: TvShowDTO): TvShow {
    return {
      id,
      title: name,
      poster: poster_path,
      rating: vote_average,
      releaseDate: first_air_date ? new Date(first_air_date) : undefined,
      mediaType: MediaType.Tv,
      description: overview,
      background: backdrop_path,
      popularity,
      voteCount: vote_count,
    };
  }

  transformTVShowDetailed(tvShowDetailed: TvShowDTODetailed): TvShowDetailed {
    return {
      ...this.transformTVShow(tvShowDetailed),
      ...this.transformMovieTvDetails(tvShowDetailed),
      creators: this.transformTvShowCreators(tvShowDetailed.created_by),
    };
  }

  transformMovieTvDetails({
    credits,
    genres,
  }: MovieTVDetailsDTO): MovieTVDetails {
    return {
      genres,
      credits: this.transformCredits(credits),
    };
  }

  transformCredits({ cast, crew }: CreditsDTO): Credits {
    return {
      cast: cast.map(castUnit => this.transformCastPerson(castUnit)),
      crew: crew.map(crewUnit => this.transformCastPerson(crewUnit)),
    };
  }

  transformTvShowCreators(creators: TvShowCreatorDTO[]): Cast[] {
    return creators.map(({ name, id, profile_path, credit_id }) => ({
      name,
      id,
      photo: profile_path,
      mediaType: MediaType.Person,
      creditId: credit_id,
      job: 'Creator',
    }));
  }

  transformPersonDetailed({
    id,
    profile_path,
    name,
    combined_credits,
    biography,
    birthday,
    place_of_birth,
    known_for_department,
  }: PersonDTODetailed): PersonDetailed {
    return {
      name,
      id,
      biography,
      photo: profile_path,
      birthday,
      placeOfBirth: place_of_birth,
      mediaType: MediaType.Person,
      knownForDepartment: known_for_department,
      combinedCredits:
        this.transformPersonDetailedCombinedCredits(combined_credits),
    };
  }

  transformPersonDetailedCombinedCredits({
    cast,
    crew,
  }: PersonDTODetailedCombinedCredits): PersonDetailsCombinedCredits {
    return {
      cast: cast.map(castUnit => ({
        ...this.transformKnownFor(castUnit),
        ...this.transformKnownForAsCastDetails(castUnit),
      })),
      crew: crew.map(crewUnit => ({
        ...this.transformKnownFor(crewUnit),
        ...this.transformKnownForAsCrewDetails(crewUnit),
      })),
    };
  }

  transformKnownFor(knownForItem: KnownForDTO): KnownFor {
    switch (knownForItem.media_type) {
      case MediaType.Movie:
        return this.transformMovie(knownForItem);
      case MediaType.Tv:
        return this.transformTVShow(knownForItem);
    }
  }

  transformKnownForAsCastDetails({
    character,
  }: KnownForAsCastDTO): KnownForAsCreditsDetails {
    return {
      job: character,
      department: 'Acting',
    };
  }

  transformKnownForAsCrewDetails({
    job,
    department,
  }: KnownForAsCrewDTO): KnownForAsCreditsDetails {
    return {
      job,
      department,
    };
  }
}
