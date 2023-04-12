import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GridMediaItem } from 'src/app/types/ui-types/grid-media-item';

@Component({
  selector: 'mdb-ui-cards-grid',
  templateUrl: './ui-cards-grid.component.html',
  styleUrls: ['./ui-cards-grid.component.scss'],
})
export class UiCardsGridComponent {
  @Input() public dataList: GridMediaItem[] = [];
  @Input() public withMobileScroll = false;

  @Output() public resultClick = new EventEmitter();

  trackById(_: number, item: GridMediaItem): number {
    return item.id;
  }
}
