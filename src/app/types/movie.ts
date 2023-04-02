import { Genre } from './genres';
import { MediaType } from './media-type';

export interface Movie {
  id: number;
  poster: string | null;
  title: string;
  mediaType: MediaType.Movie;
  genres: Genre[];
  releaseDate?: Date;
  rating?: number;
}
