import { Injectable } from '@angular/core';

import {Observable, of, Subject, throwError} from 'rxjs';
import { MessageService } from './message.service';

import { Hero } from './data/hero';
import * as firebase from "firebase";
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  heroes: Observable<Hero[]>;
  heroesSubject = new Subject<Hero[]>();

  constructor(private messageService: MessageService) {
    this.heroes = this.getHeroes();
  }

  saveHeroes() {
    firebase.database().ref('/heroes').set(this.heroes);
  }

  getHeroes(): Observable<Hero[]> {
    return new Observable(observer => {
      firebase.database().ref('/heroes').on('value', data => {
        return observer.next(data.val());
      }, error => {
        return throwError(error);
      });
    });
  }

  getHero(id: number): Observable<Hero> {
    return new Observable(observer => {
      firebase.database().ref('/heroes' + id).once('value', data => {
        return observer.next(data.val());
      }, error => {
        return throwError(error);
      });
    });
  }

  createHero(hero: Hero) {
    firebase.database().ref('/heroes').push(hero);
    this.heroes = this.getHeroes();
  }

  /*getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: héros lus');
    return of(HEROES);
  }

  getHero(id: number): Observable<Hero> {
    this.messageService.add(`HeroService: héro id=${id} lu`);
    return of(HEROES.find(hero => hero.id === id));
  }*/
}
