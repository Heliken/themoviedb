import { MediaType } from '../media-type';
import { MovieTVDetailsDTO } from './movie-tv-details-dto';
import { Rated } from './rated-dto';

export interface MovieDTO {
  adult: boolean;
  backdrop_path: null | string;
  genre_ids?: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date?: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  media_type?: MediaType.Movie;
}

export type MovieDTODetailed = MovieDTO & MovieTVDetailsDTO;

export type MovieDTORated = MovieDTO & Rated;
