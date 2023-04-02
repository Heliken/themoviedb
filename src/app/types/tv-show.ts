import { Genre } from './genres';
import { MediaType } from './media-type';

export interface TvShow {
  id: number;
  poster: string | null;
  title: string;
  mediaType: MediaType.Tv;
  genres: Genre[];
  releaseDate?: Date;
  rating?: number;
}
