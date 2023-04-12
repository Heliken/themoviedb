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
}

export type MovieDetailed = Movie & MovieTVDetails;
