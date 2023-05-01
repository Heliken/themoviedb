import { Observable } from 'rxjs';
import { MediaItem } from 'src/app/types/media-item';
import { UICardsGridType } from '../../../types/ui-types/ui-cards-grid-type';

export interface MainpageSection {
  title: string;
  list$: Observable<MediaItem[]>;
  gridType: UICardsGridType;
}
