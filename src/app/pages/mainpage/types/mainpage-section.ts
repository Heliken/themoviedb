import { Observable } from 'rxjs';
import { GridMediaItem } from 'src/app/types/grid-media-item';

export interface MainpageSection {
  title: string;
  list$: Observable<GridMediaItem[]>;
}
