import { of } from 'rxjs';
import { SESSION_ID_CACHE_KEY } from '../../api-info';
import { LocalStorageService } from '../services/local-storage.service';
import { UserInfoService } from '../services/user-info.service';
import { AuthorizationService } from '../services/authorization.service';

export const userInfoInitializerFactory =
  (
    userInfo: UserInfoService,
    authService: AuthorizationService,
    localStorage: LocalStorageService<string>
  ) =>
  () => {
    const sessionId = localStorage.getItem(SESSION_ID_CACHE_KEY);
    authService.isLoggedIn$.next(!!sessionId);
    return sessionId ? userInfo.getUserInfo() : of(undefined);
  };
