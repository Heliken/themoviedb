import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AccessTokenResponse,
  LoginResponse,
} from '../types/DTO/authentification-response';
import { Observable, map, of, tap } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { REQUEST_ACCESS_TOKEN_CACHE_KEY } from '../../api-info';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(
    private readonly http: HttpClient,
    private localStorage: LocalStorageService<string>
  ) {}

  requestTemporaryAccessToken(): Observable<string> {
    const cachedAccessToken = this.localStorage.getItem(
      REQUEST_ACCESS_TOKEN_CACHE_KEY
    );

    return cachedAccessToken
      ? of(cachedAccessToken)
      : this.http.get<AccessTokenResponse>('authentication/token/new').pipe(
          tap(({ request_token, expires_at }) =>
            this.localStorage.setItem(REQUEST_ACCESS_TOKEN_CACHE_KEY, {
              data: request_token,
              timestamp: new Date(expires_at).toString(),
            })
          ),
          map(({ request_token }) => request_token)
        );
  }
}
