import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import {Hero} from "../data/hero";
import {HeroService} from "../hero.service";
import {WeaponService} from "../weapon.service";
import {Weapon} from "../data/weapon";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;
  weapons: Weapon[];
  heroWeaponForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private weaponService: WeaponService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
    this.getWeapons();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
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
}
