import { MediaItem } from 'src/app/types/media-item';
import { MediaType } from 'src/app/types/media-type';

export type SearchResponse = {
  response: SearchResponseSection[];
  total: number;
};

export interface SearchResponseSection {
  type: MediaType;
  result: MediaItem[];
  title: string;
}

export type SearchResponseSectionTitle = {
  [type in MediaType]: string;
};
