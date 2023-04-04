import { MediaType } from './media-type';

export interface TvShow {
  id: number;
  poster: string | null;
  title: string;
  mediaType: MediaType.Tv;
  releaseDate?: Date;
  rating?: number;
}
