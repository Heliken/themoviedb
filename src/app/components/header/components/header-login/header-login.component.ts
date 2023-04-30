import { Component } from '@angular/core';
import { UserInfoService } from '../../../../services/user-info.service';
import { AuthorizationService } from '../../../../services/authorization.service';

@Component({
  selector: 'mdb-header-login',
  templateUrl: './header-login.component.html',
  styleUrls: ['./header-login.component.scss'],
})
export class HeaderLoginComponent {
  constructor(
    private userInfo: UserInfoService,
    private authService: AuthorizationService
  ) {}

  public isLogged$ = this.userInfo.isLoggedIn$;
  public userInfo$ = this.userInfo.userInfo$;

  public logout(): void {
    this.authService.logout();
  }
}
