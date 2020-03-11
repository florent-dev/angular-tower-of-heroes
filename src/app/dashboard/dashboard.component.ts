import { Component, OnInit } from '@angular/core';
import { Hero } from '../entity/hero';
import { HeroService } from '../services/hero.service';
import {WeaponService} from "../services/weapon.service";
import {Weapon} from "../entity/weapon";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  weapons: Weapon[] = [];

  constructor(private heroService: HeroService, private weaponService: WeaponService) { }

  ngOnInit() {
    this.getHeroes();
    this.getWeapons();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }

  getWeapons(): void {
    this.weaponService.getWeapons()
      .subscribe(weapons => this.weapons = weapons.slice(1, 5))
  }
}
