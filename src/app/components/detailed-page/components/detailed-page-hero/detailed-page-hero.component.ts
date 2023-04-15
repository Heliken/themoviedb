import { Component, Input } from '@angular/core';
import { ImageTypeSize } from 'src/app/types/api-configuration';
import { MediaType } from 'src/app/types/media-type';

import { DetailedHero } from 'src/app/types/ui-types/detailed-hero';

@Component({
  selector: 'mdb-detailed-page-hero',
  templateUrl: './detailed-page-hero.component.html',
  styleUrls: ['./detailed-page-hero.component.scss'],
})
export class DetailedPageHeroComponent {
  @Input() public data?: DetailedHero;
  @Input() public title?: string;
  @Input() public img?: string | null;
  @Input() public description?: string;

  public personType = MediaType.Person;
  public posterSizeType = ImageTypeSize.poster;
  public posterSize = 'w342';
  public backgroundSizeType = ImageTypeSize.profile;
  public backgroundSize = 'original';
}
