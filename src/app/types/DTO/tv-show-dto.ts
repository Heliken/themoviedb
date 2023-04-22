import { MediaType } from '../media-type';
import { BaseMediaDTO } from './base-media-dto';
import { MovieTVDetailsDTO } from './movie-tv-details-dto';
import { Rated } from './rated-dto';

export interface TvShowDTO extends BaseMediaDTO {
  first_air_date: Date;
  name: string;
  origin_country: string[];
  original_name: string;
  media_type: MediaType.Tv;
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
