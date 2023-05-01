import { Component } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthorizationService } from '../../services/authorization.service';
import { BehaviorSubject, forkJoin, switchMap, tap } from 'rxjs';
import { LoginCredits } from '../../types/DTO/authorisation-response';
import { NotificationsService } from '../../services/notifications.service';
import { CustomNotificationType } from '../../types/notification';
import { UserInfoService } from '../../services/user-info.service';
import { Router } from '@angular/router';
import { RatingService } from '../../services/rating.service';
import { FavouritesService } from '../../services/favourites.service';

@Component({
  selector: 'mdb-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthorizationService,
    private notificationService: NotificationsService,
    private userInfo: UserInfoService,
    private router: Router,
    private ratingService: RatingService,
    private favouritesService: FavouritesService
  ) {}

  public loginForm = this.formBuilder.group({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  public isSubmitting$ = new BehaviorSubject<boolean>(false);

  public login(): void {
    this.isSubmitting$.next(true);

    this.authService
      .initNewSession(this.loginForm.value as LoginCredits)
      .pipe(
        tap(() => {
          this.isSubmitting$.next(false);
        }),
        switchMap(({ session_id }) => {
          this.userInfo.saveSessionId(session_id);
          return forkJoin([
            this.ratingService.requestRatedMoviesAndTvShows(session_id),
            this.favouritesService.requestFavMoviesAndTvShows(session_id),
          ]);
        }),
        switchMap(() => this.userInfo.getUserInfo())
      )
      .subscribe({
        next: () => this.successAction(),
        error: error => this.errorAction(error.error.status_message),
      });
  }

  public successAction(): void {
    this.authService.isLoggedIn$.next(true);
    this.notificationService.showNotification({
      type: CustomNotificationType.Success,
      message: 'You logged in successfully!',
    });

    this.router.navigate(['/']);
  }

  public errorAction(errorText: string): void {
    this.isSubmitting$.next(false);

    this.notificationService.showNotification({
      type: CustomNotificationType.Error,
      message: errorText,
    });
  }
}
