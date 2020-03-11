import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import {Weapon} from "../entity/weapon";
import {WeaponService} from "../services/weapon.service";

@Component({
  selector: 'app-weapon',
  templateUrl: './weapon.component.html',
  styleUrls: ['./weapon.component.css']
})
export class WeaponComponent implements OnInit {

  @Input() weapon: Weapon;
  info = '';

  constructor(
    private route: ActivatedRoute,
    private weaponService: WeaponService,
    private location: Location
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id')) {
      this.getWeapon();
    } else {
      this.weapon = new Weapon();
      this.weapon.attack = 0; this.weapon.damage = 0, this.weapon.dodge = 0, this.weapon.health = 0;
    }
  }

  getWeapon(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.weaponService.getWeapon(id)
      .subscribe(weapon => this.weapon = weapon);
  }

  save(): void {
    if (this.validateForm()) {
      if (this.weapon.id === null || this.weapon.id === undefined) {
        this.weaponService.addWeapon(this.weapon);
        this.info = 'Succès des changements';
      } else {
        this.weaponService.updateWeapon(this.weapon);
      }
    } else {
      this.info = 'Échec de l\'enregistrement, certaines données saisies sont invalides.';
    }
  }

  validateForm(): boolean {
    return (this.getPointsRestants() <= 40);
  }

  getPointsRestants(): number {
    return 0;
  }

  getPointsRestantsHTML(): string {
    let pointsRestants = this.getPointsRestants();
    // TODO : Fonctionnement différent pour les armes, à modifier !
    return (pointsRestants > 40) ? ("<font color='#FF00000'>" + pointsRestants + '</font>') : pointsRestants.toString()
  }

  goBack(): void {
    this.location.back();
  }
}
