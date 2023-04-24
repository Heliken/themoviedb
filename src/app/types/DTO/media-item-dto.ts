import { MediaType } from '../media-type';
import { MovieDTO } from './movie-dto';
import { PersonDTO } from './person-dto';
import { TvShowDTO } from './tv-show-dto';

export type MediaItemDTO = TvShowDTO | MovieDTO | PersonDTO;

export type MediaItemDTOWithType = MediaItemDTO & { media_type: MediaType };
