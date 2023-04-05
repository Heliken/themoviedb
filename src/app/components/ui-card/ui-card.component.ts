import { Component, Input } from '@angular/core';
import { GridMediaItem } from 'src/app/types/grid-media-item';

@Component({
  selector: 'mdb-ui-card',
  templateUrl: './ui-card.component.html',
  styleUrls: ['./ui-card.component.scss'],
})
export class UiCardComponent {
  @Input() public dataItem?: GridMediaItem;
}
