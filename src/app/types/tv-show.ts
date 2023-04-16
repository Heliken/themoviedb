import { MovieTVDetails } from './movie-tv-details';
import { MediaType } from './media-type';
import { Cast } from './credits';

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

export type TvShowDetailed = TvShow &
  MovieTVDetails & {
    creators: Cast[];
  };
