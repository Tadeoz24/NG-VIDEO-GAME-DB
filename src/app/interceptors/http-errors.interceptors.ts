import {
  catchError,
  Observable,
  throwError as observableThrowError,
} from 'rxjs';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor {
  constructor() {}
  /*

    This method require two argument and returning observable of HTTP event.

  */

  /*

    ეს მეთოდი იღებს ორ არგუმენტს და აბრუნებს observable-ს HTTP event.

  */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
        console.log(err);
        return observableThrowError(err);
      })
    );
  }
}
