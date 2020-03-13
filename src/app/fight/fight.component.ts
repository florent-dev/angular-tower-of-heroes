import { Component, OnInit } from '@angular/core';
import {Hero} from "../entity/hero";
import {HeroService} from "../services/hero.service";

@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.css']
})
export class FightComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;
  botHero: Hero;
  rounds: 5;
  currentRound = 0;
  info = '';
  fightLogs = '';

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  initFight(): void {
    if (this.selectedHero === undefined) {
      this.info = 'Veuillez choisir un héro pour combattre';
    } else {
      this.info = '';
      this.addFightLog('Le combat débute');
      this.sortRandomBotHero();
      this.currentRound = 1;
      this.nextRound();
    }
  }

  finishFight(): void {
    this.addFightLog('Fin du combat');
  }

  nextRound(): void {
    if(this.currentRound === this.rounds) {
      this.finishFight();
    } else {
      // @ts-ignore
      this.currentRound++;
    }
  }

  sortRandomBotHero(): void {
    this.botHero = this.heroes[Math.floor(Math.random() * this.heroes.length)];
  }

  addFightLog(log: string): void {
    this.fightLogs += '\n' + log;
  }
}
