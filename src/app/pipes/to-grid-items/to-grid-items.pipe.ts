import { Pipe, PipeTransform } from '@angular/core';
import { MediaToGridMediaService } from 'src/app/services/media-to-grid-media.service';
import { GridMediaItem } from 'src/app/types/ui-types/grid-media-item';
import { MediaItem } from 'src/app/types/media-item';

@Pipe({
  name: 'toGridItems',
})
export class ToGridItemsPipe implements PipeTransform {
  constructor(private mediaToGridMedia: MediaToGridMediaService) {}

  transform(media: MediaItem[]): GridMediaItem[] {
    return media.map(item => this.mediaToGridMedia.convert(item));
  }
}
