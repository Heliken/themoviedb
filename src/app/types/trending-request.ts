import { MediaItemDTO } from './DTO/media-item-dto';

export enum TrendingTimeWindow {
  day = 'day',
  week = 'week',
}

export enum TrendingType {
  all = 'all',
  movie = 'movie',
  tv = 'tv',
  person = 'person',
}

export type TrendingMediaItemDTO = MediaItemDTO & {
  media_type: TrendingType;
};
