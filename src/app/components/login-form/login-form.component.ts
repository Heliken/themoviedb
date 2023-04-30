import { Component } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthorizationService } from '../../services/authorization.service';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { LoginCredits } from '../../types/DTO/authorisation-response';
import { NotificationsService } from '../../services/notifications.service';
import { CustomNotificationType } from '../../types/notification';
import { UserInfo } from '../../types/user-info';
import { UserInfoService } from '../../services/user-info.service';

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
    private userInfo: UserInfoService
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
          this.authService.saveSessionId(session_id);
          return this.userInfo.getUserInfo();
        })
      )
      .subscribe({
        next: () => {
          this.notificationService.showNotification({
            type: CustomNotificationType.Success,
            message: 'You logged in successfully!',
          });
        },
        error: error => {
          this.isSubmitting$.next(false);

          this.notificationService.showNotification({
            type: CustomNotificationType.Error,
            message: error.error.status_message,
          });
        },
      });
  }
}
