import { Component, Input } from '@angular/core';
import { UICardsGridType } from '../../../types/ui-types/ui-cards-grid-type';
import { RESPONSE_PER_PAGE } from '../../../../api-info';

@Component({
  selector: 'mdb-ui-cards-grid-preloader',
  templateUrl: './ui-cards-grid-preloader.component.html',
  styleUrls: [
    './ui-cards-grid-preloader.component.scss',
    '../ui-cards-grid.component.scss',
  ],
})
export class UiCardsGridPreloaderComponent {
  @Input() public type = UICardsGridType.default;
  @Input() public set cardsAmount(value: number) {
    this.cardsArray = new Array(value);
  }

  public cardsArray = new Array(RESPONSE_PER_PAGE);
}
