import { Component, OnInit } from '@angular/core';
import { HeroService } from '../services/hero.service';
import { Hero } from "../entity/hero";
import {MessageService} from "../services/message.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  newHero: Hero;
  info = '';

  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit() {
    this.getHeroes();
    this.newHero = new Hero();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  addHero() {
    if (this.isValid()) {
      this.heroService.addHero(this.newHero);
      this.messageService.add("création Héro test");
    }
  }

  isValid(): boolean {
    this.info = '';

    if (this.newHero.name === '')
      this.info = 'Veuillez indiquer un nom au héro';

    return (this.info == '');
  }

}
