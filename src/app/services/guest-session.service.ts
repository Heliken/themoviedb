import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
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

  public getSessionId(): string | undefined {
    return this.sessionId;
  }

  public loadSessionId(): Observable<string> {
    if (this.sessionId) {
      return of(this.sessionId);
    } else {
      return this.requestSessionId().pipe(
        map(guestSession => (this.sessionId = guestSession.guest_session_id))
      );
    }
  }

  private sessionId = this.localStorageService.getItem(
    GUEST_SESSION_ID_CACHE_KEY
  );

  private requestSessionId(): Observable<GuestSession> {
    return this.http.get<GuestSession>('authentication/guest_session/new');
  }

  public saveSessionId(): void {
    if (this.sessionId) {
      this.localStorageService.setItem(GUEST_SESSION_ID_CACHE_KEY, {
        data: this.sessionId,
      });
    }
  }
}
