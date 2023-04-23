import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RatingService } from 'src/app/services/rating.service';
import { RatingPostConfig } from 'src/app/types/rating-post-config';

@Component({
  selector: 'mdb-detailed-page-hero-rating',
  templateUrl: './detailed-page-hero-rating.component.html',
  styleUrls: ['./detailed-page-hero-rating.component.scss'],
})
export class DetailedPageHeroRatingComponent implements OnInit {
  constructor(private ratingService: RatingService) {}
  @Input() public value = 0;
  @Input() public title = 'Rating: ';
  @Input() public ratingPostConfig?: RatingPostConfig;

  public showDropdown = false;

  public guestUserRated?: Observable<number | undefined>;

  public toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  public ngOnInit() {
    if (this.ratingPostConfig) {
      const { type, id } = this.ratingPostConfig;
      this.guestUserRated = this.ratingService.getRating(id, type);
    }
  }
}
