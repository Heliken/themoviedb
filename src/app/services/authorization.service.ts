import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AccessTokenResponse,
  LoginCredits,
  NewSessionResponse,
} from '../types/DTO/authorisation-response';
import { Observable, map, switchMap, tap } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import {
  REQUEST_ACCESS_TOKEN_CACHE_KEY,
  SESISON_ID_CACHE_KEY,
} from '../../api-info';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(
    private readonly http: HttpClient,
    private localStorage: LocalStorageService<string>
  ) {}

  requestAccessToken(): Observable<string> {
    return this.http.get<AccessTokenResponse>('authentication/token/new').pipe(
      tap(({ request_token, expires_at }) =>
        this.saveRequestAccessToken(request_token, expires_at)
      ),
      map(({ request_token }) => request_token)
    );
  }

  saveRequestAccessToken(token: string, expires: string): void {
    this.localStorage.setItem(REQUEST_ACCESS_TOKEN_CACHE_KEY, {
      data: token,
      expires: new Date(expires).toString(),
    });
  }

  requestLogin(
    request_token: string,
    credits: LoginCredits
  ): Observable<AccessTokenResponse> {
    return this.http.post<AccessTokenResponse>(
      'authentication/token/validate_with_login',
      {
        request_token,
        ...credits,
      }
    );
  }

  requestNewSession(request_token: string): Observable<NewSessionResponse> {
    return this.http.post<NewSessionResponse>('authentication/session/new', {
      request_token,
    });
  }

  initNewSession(credits: LoginCredits): Observable<NewSessionResponse> {
    return this.requestAccessToken().pipe(
      switchMap(token => this.requestLogin(token, credits)),
      switchMap(({ request_token }) => this.requestNewSession(request_token))
    );
  }

  saveSessionId(id: string) {
    this.localStorage.setItem(SESISON_ID_CACHE_KEY, {
      data: id,
    });
  }
}
