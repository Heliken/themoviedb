import { Genre } from '../genre';
import { CreditsDTO } from './credits-dto';

export interface MovieTVDetailsDTO {
  credits: CreditsDTO;
  genres: Genre[];
}
