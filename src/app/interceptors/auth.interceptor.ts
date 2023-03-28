import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { API_KEY } from '../../api-info';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(
      req.clone({
        params: req.params.append('api_key', API_KEY),
      })
    );
  }
}
