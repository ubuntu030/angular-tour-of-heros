import { Injectable } from '@angular/core';

import { Observable, of } from "rxjs";

import { HttpClient, HttpHeaders } from "@angular/common/http";

import { MessageService } from "./message.service";
import { Hero } from "./hero";
import { HEROES } from "./mock-heros";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private heroesUrl = 'api/heroes';
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
  }
  getHero(id: number): Observable<Hero | undefined> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id || null}`);
    return of(HEROES.find(hero => hero.id === id));
  }
}
