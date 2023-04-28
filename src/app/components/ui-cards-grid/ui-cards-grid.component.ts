import { Component, Input } from '@angular/core';
import { GridMediaItem } from 'src/app/types/ui-types/grid-media-item';
import { UICardsGridType } from '../../types/ui-types/ui-cards-grid-type';
import { ImgSize } from '../../types/ui-types/img-size';

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
    [UICardsGridType.fullpage]: ImgSize.w342,
    [UICardsGridType.default]: ImgSize.w185,
    [UICardsGridType.mobileScroll]: ImgSize.w185,
  };
}
