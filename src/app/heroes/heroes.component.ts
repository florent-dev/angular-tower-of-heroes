import { Component, OnInit } from '@angular/core';
import {HEROES} from "../data/mock-heroes";

export class Hero {
  id: number;
  name: string;
}

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  selectedHero = null;
  heroes = HEROES;

  constructor() { }

  ngOnInit() {
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }
}
