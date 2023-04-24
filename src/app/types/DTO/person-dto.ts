import { MediaType } from '../media-type';
import { MovieDTO } from './movie-dto';
import { TvShowDTO } from './tv-show-dto';

export interface PersonDTO {
  adult: boolean;
  id: number;
  name: string;
  original_name: string;
  popularity: number;
  gender: number;
  known_for_department: string;
  profile_path: null | string;
  known_for?: KnownForDTO[];
  media_type?: MediaType.Person;
}

export type KnownForDTO = MovieDTO | TvShowDTO;

export type KnownForAsCrewDTO = KnownForDTO & KnownForAsCrewDTODetails;

export interface KnownForAsCrewDTODetails {
  job: string;
  department: string;
}

export type KnownForAsCastDTO = KnownForDTO & KnownForAsCastDTODetails;

export interface KnownForAsCastDTODetails {
  character: string;
}

export type PersonDTODetailed = PersonDTO & {
  place_of_birth?: string;
  birthday?: Date;
  biography?: string;
  combined_credits: PersonDTODetailedCombinedCredits;
};

export interface PersonDTODetailedCombinedCredits {
  crew: KnownForAsCrewDTO[];
  cast: KnownForAsCastDTO[];
}
