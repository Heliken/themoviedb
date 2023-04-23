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

export type KnownForAsCredits = KnownFor & KnownForAsCreditsDetails;

export interface KnownForAsCreditsDetails {
  job: string;
  department?: string;
}

export interface PersonDetails {
  knownForDepartment: string;
  placeOfBirth?: string;
  birthday?: Date;
  biography?: string;
  combinedCredits: PersonDetailsCombinedCredits;
}

export interface PersonDetailsCombinedCredits {
  cast: KnownForAsCredits[];
  crew: KnownForAsCredits[];
}

export type PersonDetailed = Person & PersonDetails;
