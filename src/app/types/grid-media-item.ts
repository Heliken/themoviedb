import { Genre } from './genres';
import { MediaType } from './media-type';
export interface GridMediaItem {
  id: number;
  type: MediaType;
  image: string | null;
  title: string;
  releaseDate?: Date;
  rating?: number;
  genres?: Genre[];
}
