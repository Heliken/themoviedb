import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { SESSION_ID_CACHE_KEY } from '../../api-info';

@Injectable()
export class UserInfoInterceptor implements HttpInterceptor {
  constructor(private localStorage: LocalStorageService<string>) {}

  intercept<T>(
    req: HttpRequest<T>,
    next: HttpHandler
  ): Observable<HttpEvent<T>> {
    const sessionId = this.localStorage.getItem(SESSION_ID_CACHE_KEY);
    const isUserInfoRequest = req.url.includes('/account');

    if (sessionId && isUserInfoRequest) {
      return next.handle(
        req.clone({
          url: req.url,
          params: req.params.append('session_id', sessionId),
        })
      );
    } else {
      return next.handle(req);
    }
  }
}
