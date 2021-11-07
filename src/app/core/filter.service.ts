import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../service/auth/auth.service';
import { TokenService } from '../service/auth/token/token.service';
import { catchError, concatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FilterService implements HttpInterceptor {


  constructor(
    private tokenService: TokenService
  ){  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.tokenService.isLogged()) return next.handle(req);

    const token = this.tokenService.getToken();
    let request = this.addToken(req, token);

    return next.handle(request).pipe(catchError((err: HttpErrorResponse) => {
      this.tokenService.logOut();
      return throwError(err);
    }));

  }


  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
  }
}

export const filterProvider = [{ provide: HTTP_INTERCEPTORS, useClass: FilterService, multi: true }];
