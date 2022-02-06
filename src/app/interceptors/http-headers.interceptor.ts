import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {
  constructor() {}
  /*

    This method with two headers, First one is RapidAPI Key and second one is host.

  */

  /*

    ეს მეთოდი ორი სათაურით, პირველი არის RapidAPI Key და მეორე არის Host.

  */

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com',
        'x-rapidapi-key': '9c402fea07msh01c895dbec5cfdbp141fecjsn604e47df6922',
      },
      setParams: {
        key: 'ca53ca01613045758b08908233d59bb0',
      },
    });
    return next.handle(req);
  }
}
