import { Component, Input } from '@angular/core';
import { GridMediaItem } from 'src/app/types/ui-types/grid-media-item';
import { ImageTypeSize } from '../../types/api-configuration';
import { ImgSize } from '../../types/ui-types/img-size';

@Component({
  selector: 'mdb-ui-card',
  templateUrl: './ui-card.component.html',
  styleUrls: ['./ui-card.component.scss'],
})
export class UiCardComponent {
  @Input() public dataItem?: GridMediaItem;
  @Input() public imgSize = ImgSize.w185;

  public imageSizeType = ImageTypeSize.poster;
}
