import { APIResponse, Game } from './../../models';
import { HttpService } from './../../services/http.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  //This sort variable is used to attach mat-select panelClass="sort-select"
  //ეს დალაგების ცვლადი გამოიყენება mat-select panelClass="sort-select"-ის დასამაგრებლად
  public sort!: string;

  public games!: Array<Game>;
  private routeSub!: Subscription;
  private gameSub!: Subscription;

  constructor(
    private httpService: HttpService,
    private activatedroute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    //Search text attached to the URL
    //ძებნის ტექსტი ემაგრება URL-ზე
    this.routeSub = this.activatedroute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchGames('metacrit', params['game-search']);
      } else {
        this.searchGames('metacrit');
      }
    });
  }

  //Method call API and fetch this data.
  //მეთოდი იძახებს API-ს და ფეჩავს მონაცემს.
  searchGames(sort: string, search?: string): void {
    this.gameSub = this.httpService
      .getGameList(sort, search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
        console.log(gameList);
      });
  }

  //Navigate to details page and send in ID as a parameter.
  //დეტალების გვერდზე გადასვლისას იღებს აიდის როგორც პარამეტრი.
  openGameDetails(id: string): void {
    this.router.navigate(['details', id]);
  }

  //Life Cycle hook
  ngOnDestroy(): void {
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
