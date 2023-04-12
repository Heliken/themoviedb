import { Pipe, PipeTransform } from '@angular/core';
import { MediaDetailedToDetailedService } from 'src/app/services/media-detailed-to-detailed.service';
import { MediaItemDetailed } from 'src/app/types/media-item';
import { DetailedHero } from 'src/app/types/ui-types/detailed-hero';

@Pipe({
  name: 'toDetailedHero',
})
export class ToDetailedHeroPipe implements PipeTransform {
  constructor(
    private mediaDetailedToDetailed: MediaDetailedToDetailedService
  ) {}
  transform(value: MediaItemDetailed): DetailedHero {
    return this.mediaDetailedToDetailed.convertToHero(value);
  }
}
