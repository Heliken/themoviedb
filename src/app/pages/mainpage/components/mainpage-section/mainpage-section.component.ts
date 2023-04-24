import { Component, Input } from '@angular/core';
import { MainpageSection } from '../../types/mainpage-section';
import { UICardsGridType } from '../../../../types/ui-types/ui-cards-grid-type';

@Component({
  selector: 'mdb-mainpage-section',
  templateUrl: './mainpage-section.component.html',
  styleUrls: ['./mainpage-section.component.scss'],
})
export class MainpageSectionComponent {
  @Input() public section?: MainpageSection;

  public mobileScrollGrid = UICardsGridType.mobileScroll;
}
