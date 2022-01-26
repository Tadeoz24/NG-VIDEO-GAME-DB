//Service which actually fetch URL and real Data which will be fitting in to our Home Component
//Service, რომელიც რეალურად იღებს URL-ს და რეალურ მონაცემებს, რომლებიც წარსდგება ჩვენს Home Component-ზე

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { APIResponse, Game } from '../models';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  [x: string]: any;

  //Injected HTTP Client which will be dependency to communicate with out Back-End.
  //მოცემულია HTTP Client, რომელზეც იქნება დამოკიდებული Back-End-თან კომუნიკაცია.
  constructor(private http: HttpClient) {}

  /*

  This is the Method which is calling from Home Component and fetching the list of the games.
  Get two argument- Ordering and Search (not going to be required ) and returning Observable Api response.

  Params- Parameter variable, default one is going to be ordering in order for sort the game list.

  If user is providing a search and type anything into searchbox added append also the search parameter.

  Finally return HTTP GET Method which will be return API response the game interface.

  BASE_URL created inside of Environment file.

  */

  /*

  ეს არის მეთოდი, რომელიც გამოიძახება მთავარი კომპონენტიდან და იღებს თამაშების სიას.
  იღებს ორ არგუმენტს - Ordering და Search-ს (არ იქნება საჭირო) და აბრუნებს Observable Api პასუხს.

  Params- Parameter ცვლადი, ნაგულისხმევი ცვლადი არის Ordering რომელიც ალაგებს თამაშების სიას.

  თუ მომხმარებელი ეძებს და და წერს რამეს საძიებო ველში, ემატება ასევე საძიებო პარამეტრი.

  საბოლოოდ ბრუნდება HTTP GET მეთოდი, რომელიც აბრუნებს თამაშის ინტერფეისისთვის API-ს.

  BASE_URL შექმნილია Environment file-ში.

  */
  getGameList(
    ordering: string,
    search?: string
  ): Observable<APIResponse<Game>> {
    let params = new HttpParams().set('ordering', ordering);

    if (search) {
      params = new HttpParams().set('ordering', ordering).set('search', search);
    }

    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, {
      params: params,
    });
  }

  getGameDetails(id: string): Observable<Game> {
    const gameInfoRequest = this.http.get(`${env.BASE_URL}/games/${id}`);
    const gameTrailersRequst = this.http.get(
      `${env.BASE_URL}/games/${id}/movies`
    );
    const gameScreenshotsRequest = this.http.get(
      `${env.BASE_URL}/games/${id}/screenshots`
    );
    return forkJoin({
      gameInfoRequest,
      gameScreenshotsRequest,
      gameTrailersRequst,
    }).pipe(
      map((resp: any) => {
        return {
          ...resp['gameInfoRequest'],
          screenshots: resp['gameScreenshotsRequest']?.results,
          trailers: resp['gameTrailersRequst']?.results,
        };
      })
    );
  }
}
