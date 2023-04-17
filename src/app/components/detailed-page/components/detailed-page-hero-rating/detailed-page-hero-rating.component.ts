import { Component, Input } from '@angular/core';
import { RatingPostConfig } from 'src/app/pipes/to-rating-post-config/to-rating-post-config.pipe';

@Component({
  selector: 'mdb-detailed-page-hero-rating',
  templateUrl: './detailed-page-hero-rating.component.html',
  styleUrls: ['./detailed-page-hero-rating.component.scss'],
})
export class DetailedPageHeroRatingComponent {
  @Input() public value = 0;
  @Input() public title = 'Rating: ';
  @Input() public ratingPostConfig?: RatingPostConfig;

  public showDropdown = false;

  public toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }
}
