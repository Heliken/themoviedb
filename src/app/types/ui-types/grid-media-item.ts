import { MediaType } from '../media-type';
export interface GridMediaItem {
  id: number;
  type: MediaType;
  image: string | null;
  title: string;
  subtitle?: string;
  rating?: number;
}
