import { Component, Input } from '@angular/core';
import { GridMediaItem } from 'src/app/types/ui-types/grid-media-item';
import { UICardsGridType } from '../../types/ui-types/ui-cards-grid-type';

@Component({
  selector: 'mdb-ui-cards-grid',
  templateUrl: './ui-cards-grid.component.html',
  styleUrls: ['./ui-cards-grid.component.scss'],
})
export class UiCardsGridComponent {
  @Input() public dataList: GridMediaItem[] = [];
  @Input() public type = UICardsGridType.default;

  trackById(_: number, item: GridMediaItem): number {
    return item.id;
  }

  public cardImgSize = {
    [UICardsGridType.fullpage]: 'w342',
    [UICardsGridType.default]: 'w185',
    [UICardsGridType.mobileScroll]: 'w185',
  };
}
