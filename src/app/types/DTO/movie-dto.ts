import { MediaType } from '../media-type';
import { BaseMediaDTO } from './base-media-dto';
import { MovieTVDetailsDTO } from './movie-tv-details-dto';
import { Rated } from './rated-dto';

export interface MovieDTO extends BaseMediaDTO {
  adult: boolean;
  original_title: string;
  release_date: string;
  title: string;
  video: boolean;
  media_type: MediaType.Movie;
}

export type MovieDTODetailed = MovieDTO & MovieTVDetailsDTO;

export type MovieDTORated = MovieDTO & Rated;
