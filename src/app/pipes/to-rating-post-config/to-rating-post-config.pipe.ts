import { Pipe, PipeTransform } from '@angular/core';
import { CanBeRatedMediaType } from 'src/app/types/media-type';
import { MovieDetailed } from 'src/app/types/movie';
import { TvShowDetailed } from 'src/app/types/tv-show';

export interface RatingPostConfig {
  type: CanBeRatedMediaType;
  id: number;
}

@Pipe({
  name: 'toRatingPostConfig',
})
export class ToRatingPostConfigPipe implements PipeTransform {
  transform({
    mediaType,
    id,
  }: MovieDetailed | TvShowDetailed): RatingPostConfig {
    return { type: mediaType, id };
  }
}
