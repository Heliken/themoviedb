import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { GuestSession } from '../types/guest-session';
import { LocalStorageService } from './local-storage.service';
import { GUEST_SESSION_ID_CACHE_KEY } from 'src/api-info';

@Injectable({
  providedIn: 'root',
})
export class GuestSessionService {
  constructor(
    private readonly http: HttpClient,
    private localStorageService: LocalStorageService<string>
  ) {}

  public getSessionId(): string {
    return this.sessionId;
  }

  public loadSessionId(): Observable<string> {
    const cachedSessionId = this.localStorageService.getItem(this.cacheKey);

    if (cachedSessionId) {
      return of(cachedSessionId);
    } else {
      return this.requestSessionId().pipe(
        tap(guestSession => this.saveSessionId(guestSession)),
        map(guestSession => guestSession.guest_session_id)
      );
    }
  }

  private cacheKey = GUEST_SESSION_ID_CACHE_KEY;
  private sessionId = '';

  private requestSessionId(): Observable<GuestSession> {
    return this.http.get<GuestSession>('authentication/guest_session/new');
  }

  private saveSessionId({ guest_session_id, expires_at }: GuestSession): void {
    this.sessionId = guest_session_id;

    this.localStorageService.setItem(this.cacheKey, {
      data: guest_session_id,
      timestamp: new Date(expires_at).getTime().toString(),
    });
  }
}
