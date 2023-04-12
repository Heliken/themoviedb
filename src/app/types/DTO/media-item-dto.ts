import { MovieDTO } from './movie-dto';
import { PersonDTO } from './person-dto';
import { TvShowDTO } from './tv-show-dto';

export type MediaItemDTO = TvShowDTO | MovieDTO | PersonDTO;

export type MediaItemDTOWithType = MediaItemDTO & { media_type: MediaTypeDTO };

export enum MediaTypeDTO {
  Movie = 'movie',
  Tv = 'tv',
  Person = 'person',
}
