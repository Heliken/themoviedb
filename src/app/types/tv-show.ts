import { MovieTVDetails } from './movie-tv-details';
import { MediaType } from './media-type';

export interface TvShow {
  id: number;
  poster: string | null;
  title: string;
  mediaType: MediaType.Tv;
  releaseDate?: Date;
  rating?: number;
  description: string;
  background: string | null;
}

export type TvShowDetailed = TvShow & MovieTVDetails;
