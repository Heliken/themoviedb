import { MediaTypeDTO } from './media-item-dto';

export interface PersonDTO {
  adult: boolean;
  id: number;
  name: string;
  original_name: string;
  popularity: number;
  gender: number;
  known_for_department: KnownForDepartmentDTO;
  profile_path: null | string;
  known_for: KnownForDTO[];
  media_type?: MediaTypeDTO.Person;
}

export interface KnownForDTO {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title?: string;
  original_language: string;
  original_title?: string;
  overview: string;
  poster_path: string;
  media_type: MediaTypeDTO;
  genre_ids: number[];
  popularity: number;
  release_date?: Date;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  name?: string;
  original_name?: string;
  first_air_date?: Date;
  origin_country?: string[];
}

export enum KnownForDepartmentDTO {
  Acting = 'Acting',
  Directing = 'Directing',
}
