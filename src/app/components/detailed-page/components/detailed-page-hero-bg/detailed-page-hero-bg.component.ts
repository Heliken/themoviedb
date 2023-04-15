import { Component, Input } from '@angular/core';
import { ImageTypeSize } from 'src/app/types/api-configuration';

@Component({
  selector: 'mdb-detailed-page-hero-bg',
  templateUrl: './detailed-page-hero-bg.component.html',
  styleUrls: ['./detailed-page-hero-bg.component.scss'],
})
export class DetailedPageHeroBgComponent {
  @Input() public background?: string;

  public backgroundSizeType = ImageTypeSize.profile;
  public backgroundSize = 'original';
}
