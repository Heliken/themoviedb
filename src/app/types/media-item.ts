import { Movie, MovieDetailed } from './movie';
import { Person } from './person';
import { TvShow, TvShowDetailed } from './tv-show';

export type MediaItem = Movie | TvShow | Person;

export type MediaItemDetailed = MovieDetailed | TvShowDetailed;
