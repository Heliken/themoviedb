export interface MediaItem {
  adult: boolean;
  backdrop_path: string;
  first_air_date?: Date;
  genre_ids: number[];
  id: number;
  media_type: MediaType;
  name?: string;
  original_language: string;
  original_name?: string;
  original_title?: string;
  overview: string;
  origin_country?: string[];
  popularity: number;
  poster_path: string;
  release_date?: Date;
  title?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
}

export enum MediaType {
  Movie = 'movie',
  Tv = 'tv',
}
