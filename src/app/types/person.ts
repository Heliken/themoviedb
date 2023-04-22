import { MediaType } from './media-type';
import { Movie } from './movie';
import { TvShow } from './tv-show';
export interface Person {
  id: number;
  photo: string | null;
  name: string;
  mediaType: MediaType.Person;
}

export type KnownFor = Movie | TvShow;

export type KnownForAsCrew = KnownFor & KnownForAsCrewDetails;

export interface KnownForAsCrewDetails {
  job: string;
  department: string;
}

export type KnownForAsCast = KnownFor & KnownForAsCastDetails;

export interface KnownForAsCastDetails {
  character: string;
}
export interface PersonDetails {
  placeOfBirth?: string;
  birthday?: Date;
  biography?: string;
  combinedCredits: PersonDetailsCombinedCredits;
}

export interface PersonDetailsCombinedCredits {
  cast: KnownForAsCast[];
  crew: KnownForAsCrew[];
}

export type PersonDetailed = Person & PersonDetails;
