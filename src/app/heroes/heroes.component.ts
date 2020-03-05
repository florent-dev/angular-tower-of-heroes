import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from "../data/hero";
import {MessageService} from "../message.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  newHeroAction() {
    // @ts-ignore
    let hero: Hero = {
      id: '0', name: 'Windstorm',
      attack: 1, damage: 1, dodge: 1, health: 1
    };
    this.heroService.addHero(hero);
    this.messageService.add("création Héro test");
  }
}
