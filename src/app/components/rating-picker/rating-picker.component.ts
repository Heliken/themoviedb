import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, switchMap } from 'rxjs';
import { RatingPostConfig } from 'src/app/types/rating-post-config';
import { GuestSessionService } from 'src/app/services/guest-session.service';
import { RatingService } from 'src/app/services/rating.service';

@Component({
  selector: 'mdb-rating-picker',
  templateUrl: './rating-picker.component.html',
  styleUrls: ['./rating-picker.component.scss'],
})
export class RatingPickerComponent {
  constructor(
    private readonly ratingService: RatingService,
    private readonly guestSessionService: GuestSessionService
  ) {}

  @Input() public initial = 5;
  @Input() public ratingPostConfig?: RatingPostConfig;

  public isSubmitting$ = new BehaviorSubject<boolean>(false);
  public step = 0.5;
  public min = this.step;
  public max = 10;
  public ratedMaps = this.ratingService.ratedMaps;

  public ratingValue = new FormControl(this.initial);

  public submitRating() {
    if (this.ratingPostConfig && this.ratingValue.value) {
      const { id, type } = this.ratingPostConfig;
      const value = this.ratingValue.value;

      this.isSubmitting$.next(true);

      this.guestSessionService
        .loadSessionId()
        .pipe(switchMap(() => this.ratingService.postRating(id, type, value)))
        .subscribe({
          next: () => {
            this.ratingService.addNewRated(id, type, value);
            this.isSubmitting$.next(false);
          },
          error: error => {
            console.error('Error submitting rating:', error);
            this.isSubmitting$.next(false);
          },
        });
    }
  }
}
