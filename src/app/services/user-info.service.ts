import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs';
import { UserInfoDTO } from '../types/DTO/user-info';
import { HttpClient } from '@angular/common/http';
import { DtoTransformService } from './dto-transform.service';
import { UserInfo } from '../types/user-info';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  constructor(
    private http: HttpClient,
    private dtoTransform: DtoTransformService
  ) {}

  public userInfo$ = new BehaviorSubject<UserInfo | undefined>(undefined);

  public getUserInfo(): Observable<UserInfo> {
    return this.http.get<UserInfoDTO>('/account').pipe(
      map(user => this.dtoTransform.transformUserInfo(user)),
      tap(userInfo => {
        this.userInfo$.next(userInfo);
      })
    );
  }
}
