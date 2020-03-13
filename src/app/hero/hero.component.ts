import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import {Hero} from "../entity/hero";
import {HeroService} from "../services/hero.service";
import {WeaponService} from "../services/weapon.service";
import {Weapon} from "../entity/weapon";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  @Input() hero: Hero;
  weapons: Weapon[];
  info = '';

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private weaponService: WeaponService,
    private location: Location
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id')) {
      this.getHero();
    } else {
      this.hero = new Hero();
      this.hero.attack = 0; this.hero.damage = 0; this.hero.dodge = 0; this.hero.health = 0;
    }

    this.getWeapons();
  }

  getHero(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  getWeapons() {
    this.weaponService.getWeapons()
      .subscribe(weapons => this.weapons = weapons);
  }

  goBack(): void {
    this.location.back();
  }

  save() {
    if (this.validateForm()) {
      this.heroService.updateHero(this.hero);
      this.info = 'Succès des changements';
    } else {
      this.info = 'Échec de l\'enregistrement, certaines données saisies sont invalides.';
    }
  }

  validateForm(): boolean {
    return (this.getPointsRestants() <= 40);
  }

  getPointsRestants(): number {
    return ( this.hero.attack + this.hero.health + this.hero.dodge + this.hero.damage );
  }

  getPointsRestantsHTML(): string {
    let pointsRestants = this.getPointsRestants();
    return (pointsRestants > 40) ? ("<font color='#FF00000'>" + pointsRestants + '</font>') : pointsRestants.toString()
  }
}
