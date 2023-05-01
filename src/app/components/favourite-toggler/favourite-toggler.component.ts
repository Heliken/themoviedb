import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CanBeRatedMediaItem } from '../../types/media-item';
import { FavouritesService } from '../../services/favourites.service';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { NotificationsService } from '../../services/notifications.service';
import { CustomNotificationType } from '../../types/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'mdb-favourite-toggler',
  templateUrl: './favourite-toggler.component.html',
  styleUrls: ['./favourite-toggler.component.scss'],
})
export class FavouriteTogglerComponent implements OnInit, OnDestroy {
  constructor(
    private favService: FavouritesService,
    private notificationService: NotificationsService,
    private router: Router
  ) {}
  @Input() public media?: CanBeRatedMediaItem;
  @Input() public isLoggedIn: boolean | null = false;

  public addToFavSubscription = new Subscription();

  public isActive$?: Observable<boolean>;

  public isSubmitting$ = new BehaviorSubject<boolean>(false);

  public togglerClick(): void {
    this.isLoggedIn ? this.toggleFav() : this.router.navigate(['/login']);
  }

  public toggleFav(): void {
    if (this.media) {
      const mediaItem = this.media;
      const { id, mediaType: type } = mediaItem;

      this.isSubmitting$.next(true);

      this.addToFavSubscription = this.favService
        .isInFavourites(id, type)
        .pipe(
          take(1),
          switchMap(isFav => {
            return this.favService
              .postToggleFav(id, type, !isFav)
              .pipe(map(result => ({ isFav: !isFav, result })));
          })
        )
        .subscribe({
          next: ({ isFav }) => this.successAction(isFav, mediaItem),
          error: error => this.errorAction(error.error.status_message),
        });
    }
  }

  public successAction(isFav: boolean, media: CanBeRatedMediaItem) {
    this.isSubmitting$.next(false);

    this.favService.toggleNewFav(isFav, media);

    this.notificationService.showNotification({
      type: CustomNotificationType.Success,
      message: isFav
        ? 'Item was added to favourites'
        : 'Item was removed from favourites',
    });
  }

  public errorAction(message: string): void {
    this.isSubmitting$.next(false);

    this.notificationService.showNotification({
      type: CustomNotificationType.Error,
      message,
    });
  }

  public ngOnInit(): void {
    if (this.media) {
      this.isActive$ = this.favService.isInFavourites(
        this.media?.id,
        this.media?.mediaType
      );
    }
  }

  ngOnDestroy(): void {
    if (this.addToFavSubscription) {
      this.addToFavSubscription.unsubscribe();
    }
  }
}
