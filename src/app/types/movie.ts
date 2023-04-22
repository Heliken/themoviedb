import { MovieTVDetails } from './movie-tv-details';
import { MediaType } from './media-type';

export interface Movie {
  id: number;
  poster: string | null;
  title: string;
  mediaType: MediaType.Movie;
  releaseDate?: Date;
  rating?: number;
  description: string;
  background: string | null;
  popularity: number;
  voteCount: number;
}

export type MovieDetailed = Movie & MovieTVDetails;

export interface MovieTvRated {
  id: number;
  rating: number;
}
