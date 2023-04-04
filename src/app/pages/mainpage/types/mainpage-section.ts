import { Observable } from 'rxjs';
import { MediaItem } from 'src/app/types/media-item';

export interface MainpageSection {
  title: string;
  list$: Observable<MediaItem[]>;
}
