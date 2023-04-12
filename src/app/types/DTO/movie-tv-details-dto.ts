import { CreditsDTO } from './credits-dto';
import { GenreDTO } from './genre-dto';

export interface MovieTVDetailsDTO {
  credits: CreditsDTO;
  genres: GenreDTO[];
}
