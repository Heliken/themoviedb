import { Component, Input, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Subscription, switchMap } from 'rxjs';
import { RatingPostConfig } from 'src/app/types/rating-post-config';
import { GuestSessionService } from 'src/app/services/guest-session.service';
import { RatingService } from 'src/app/services/rating.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { CustomNotificationType } from 'src/app/types/notification';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'mdb-rating-picker',
  templateUrl: './rating-picker.component.html',
  styleUrls: ['./rating-picker.component.scss'],
})
export class RatingPickerComponent implements OnDestroy {
  constructor(
    private readonly ratingService: RatingService,
    private readonly guestSessionService: GuestSessionService,
    private readonly notificationsService: NotificationsService,
    private readonly authService: AuthorizationService
  ) {}

  @Input() public initial = 5;
  @Input() public ratingPostConfig?: RatingPostConfig;

  public isSubmitting$ = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.authService.isLoggedIn$;
  public step = 0.5;
  public min = this.step;
  public max = 10;
  public submitSubscription?: Subscription;

  public ratingValue = new FormControl(this.initial);

  public submitRating() {
    if (this.ratingPostConfig && this.ratingValue.value) {
      const { id, type } = this.ratingPostConfig;
      const value = this.ratingValue.value;

      this.isSubmitting$.next(true);

      this.submitSubscription = this.ratingService
        .postRating(id, type, value)
        .subscribe({
          next: ({ status_message }) => {
            this.guestSessionService.saveSessionId();
            this.handleResponse(status_message, CustomNotificationType.Success);
            this.ratingService.addNewRated(id, type, value);
          },
          error: ({ error: { status_message } }) => {
            this.handleResponse(status_message, CustomNotificationType.Error);
          },
        });
    }
  }

  public ngOnDestroy(): void {
    if (this.submitSubscription) {
      this.submitSubscription.unsubscribe();
    }
  }

  private handleResponse(
    status_message: string,
    notificationType: CustomNotificationType
  ) {
    this.notificationsService.showNotification({
      type: notificationType,
      message: status_message,
    });
    this.isSubmitting$.next(false);
  }
}
