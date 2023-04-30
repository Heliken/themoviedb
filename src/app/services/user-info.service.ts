import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { UserInfoDTO } from '../types/DTO/user-info';
import { HttpClient } from '@angular/common/http';
import { DtoTransformService } from './dto-transform.service';
import { UserInfo } from '../types/user-info';
import { LocalStorageService } from './local-storage.service';
import { SESSION_ID_CACHE_KEY } from '../../api-info';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  constructor(
    private http: HttpClient,
    private dtoTransform: DtoTransformService,
    private localStorage: LocalStorageService<string>
  ) {}

  public userInfo$ = new BehaviorSubject<UserInfo | undefined>(undefined);

  public isLoggedIn$ = new BehaviorSubject<boolean>(false);

  private sessionId = this.localStorage.getItem(SESSION_ID_CACHE_KEY);

  getSessionId(): string | undefined {
    return this.sessionId;
  }

  saveSessionId(id: string): void {
    this.localStorage.setItem(SESSION_ID_CACHE_KEY, {
      data: id,
    });
    this.sessionId = id;
  }

  clearSessionId(): void {
    this.userInfo$.next(undefined);
    this.localStorage.removeItem(SESSION_ID_CACHE_KEY);
    this.sessionId = undefined;
  }

  public getUserInfo(): Observable<UserInfo> {
    return this.http.get<UserInfoDTO>('/account').pipe(
      map(user => this.dtoTransform.transformUserInfo(user)),
      tap(userInfo => {
        this.userInfo$.next(userInfo);
      })
    );
  }

  clearSessionid(): void {
    this.localStorage.removeItem(SESSION_ID_CACHE_KEY);
  }
}
