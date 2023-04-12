import { Component, Input } from '@angular/core';
import { MediaType } from 'src/app/types/media-type';

import { DetailedHero } from 'src/app/types/ui-types/detailed-hero';

@Component({
  selector: 'mdb-detailed-page-hero',
  templateUrl: './detailed-page-hero.component.html',
  styleUrls: ['./detailed-page-hero.component.scss'],
})
export class DetailedPageHeroComponent {
  @Input() public data?: DetailedHero;

  public personType = MediaType.Person;
}
