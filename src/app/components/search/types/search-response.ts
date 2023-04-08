import { MediaType } from 'src/app/types/media-type';
import { Movie } from 'src/app/types/movie';
import { Person } from 'src/app/types/person';
import { TvShow } from 'src/app/types/tv-show';

export interface SearchResponse {
  [MediaType.Movie]: Movie[];
  [MediaType.Tv]: TvShow[];
  [MediaType.Person]: Person[];
}
