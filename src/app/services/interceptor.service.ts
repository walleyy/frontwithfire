import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenStorageService } from './token-storage.service';
import { Observable } from 'rxjs';

const TOKEN_HEADER_KEY = 'x-access-token';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements  HttpInterceptor{

  constructor(private tokenS: TokenStorageService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.tokenS.getToken();
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, token) });
    }
    return next.handle(authReq);
  }
}
export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
];
