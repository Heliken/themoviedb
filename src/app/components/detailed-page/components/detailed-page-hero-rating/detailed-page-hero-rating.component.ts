import { Component, Input } from '@angular/core';

@Component({
  selector: 'mdb-detailed-page-hero-rating',
  templateUrl: './detailed-page-hero-rating.component.html',
  styleUrls: ['./detailed-page-hero-rating.component.scss'],
})
export class DetailedPageHeroRatingComponent {
  @Input() public value = 0;
  @Input() public title = 'Rating: ';
}
