import { MediaType } from '../media-type';
import { MovieTVDetailsDTO } from './movie-tv-details-dto';
import { Rated } from './rated-dto';

export interface TvShowDTO {
  backdrop_path: null | string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: null | string;
  vote_average: number;
  vote_count: number;
  media_type?: MediaType.Tv;
}

export type TvShowDTODetailed = TvShowDTO &
  MovieTVDetailsDTO & {
    created_by: TvShowCreatorDTO[];
  };

export interface TvShowCreatorDTO {
  credit_id: string;
  gender: number;
  id: number;
  name: string;
  profile_path: string;
}

export type TvShowDTORated = TvShowDTO & Rated;
