import { Genre } from '../genre';
import { MediaType } from '../media-type';

export interface DetailedHero {
  title: string;
  description: string;
  mediaType: MediaType;
  img: string | null;
  date?: Date;
  genres?: Genre[];
  rating?: number;
  background?: string;
}
