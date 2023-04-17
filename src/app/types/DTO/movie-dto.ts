import { MediaTypeDTO } from './media-item-dto';
import { MovieTVDetailsDTO } from './movie-tv-details-dto';

export interface MovieDTO {
  adult: boolean;
  backdrop_path: null | string;
  genre_ids?: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date?: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  media_type?: MediaTypeDTO.Movie;
}

export type MovieDTODetailed = MovieDTO & MovieTVDetailsDTO;
