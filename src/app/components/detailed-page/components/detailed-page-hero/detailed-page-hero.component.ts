import { Component, Input } from '@angular/core';
import { ImageTypeSize } from 'src/app/types/api-configuration';
import { ImgSize } from '../../../../types/ui-types/img-size';
@Component({
  selector: 'mdb-detailed-page-hero',
  templateUrl: './detailed-page-hero.component.html',
  styleUrls: ['./detailed-page-hero.component.scss'],
})
export class DetailedPageHeroComponent {
  @Input() public title?: string;
  @Input() public img?: string | null;
  @Input() public description?: string;
  @Input() public isPersonPage = false;

  public posterSizeType = ImageTypeSize.poster;
  public posterSize = ImgSize.w342;
}
