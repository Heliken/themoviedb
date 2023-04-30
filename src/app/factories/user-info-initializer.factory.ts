import { of } from 'rxjs';
import { SESISON_ID_CACHE_KEY } from '../../api-info';
import { LocalStorageService } from '../services/local-storage.service';
import { UserInfoService } from '../services/user-info.service';

export const userInfoInitializerFactory =
  (userInfo: UserInfoService, localStorage: LocalStorageService<string>) =>
  () => {
    const sessionId = localStorage.getItem(SESISON_ID_CACHE_KEY);
    return sessionId ? userInfo.getUserInfo() : of(undefined);
  };
