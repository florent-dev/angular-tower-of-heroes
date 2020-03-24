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

  save(): void {
    if (this.validateForm()) {
      this.normalizeForm();
      if (this.hero.id === null || this.hero.id === undefined) {
        this.heroService.addHero(this.hero);
        this.info = 'Succès de la création du héro: "' + this.hero.name + '"';
      } else {
        this.heroService.updateHero(this.hero);
        this.info = 'Succès des changements';
      }
    } else {
      this.info = 'Échec de l\'enregistrement, certaines données saisies sont invalides.';
    }
  }

  /** Vérifie la validité du formulaire. **/
  validateForm(): boolean {
    return (
      this.getPointsRestants() <= 40
      && this.hero.name !== undefined
      && this.hero.name !== ''
      && this.verifierPoints(this.hero.attack)
      && this.verifierPoints(this.hero.health)
      && this.verifierPoints(this.hero.damage)
      && this.verifierPoints(this.hero.dodge)
    );
  }

  /** Les points doivent être entre 1 et 40 **/
  verifierPoints(point: number): boolean {
    return (point >= 1 && point <= 40);
  }

  /** Normalise des champs de l'arme à la sauvegarde du formulaire. **/
  normalizeForm(): void {
    this.hero.name = this.hero.name.substr(0,1).toUpperCase() + this.hero.name.substr(1).toLowerCase();
  }

  getPointsRestants(): number {
    return ( this.hero.attack + this.hero.health + this.hero.dodge + this.hero.damage );
  }

  getPointsRestantsHTML(): string {
    let pointsRestants = this.getPointsRestants();
    return (pointsRestants > 40) ? ("<font color='#FF00000'>" + pointsRestants + '</font>') : pointsRestants.toString()
  }
}
