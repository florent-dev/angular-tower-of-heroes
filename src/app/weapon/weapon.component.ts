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
      this.weapon.attack = 0; this.weapon.damage = 0; this.weapon.dodge = 0; this.weapon.health = 0;
    }
  }

  getWeapon(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.weaponService.getWeapon(id)
      .subscribe(weapon => this.weapon = weapon);
  }

  save(): void {
    if (this.validateForm()) {
      this.normalizeForm();
      if (this.weapon.id === null || this.weapon.id === undefined) {
        this.weaponService.addWeapon(this.weapon);
        this.info = 'Succès de la création de l\'arme';
      } else {
        this.weaponService.updateWeapon(this.weapon);
        this.info = 'Succès des changements';
      }
    } else {
      this.info = 'Échec de l\'enregistrement, certaines données saisies sont invalides.';
    }
  }

  /** Vérifie la validité du formulaire. **/
  validateForm(): boolean {
    return (
      this.getPointsRestants() == 0
      && this.weapon.name !== undefined
      && this.weapon.name !== ''
      && this.verifierPoints(this.weapon.attack)
      && this.verifierPoints(this.weapon.damage)
      && this.verifierPoints(this.weapon.dodge)
      && this.verifierPoints(this.weapon.health)
    );
  }

  /** Les points doivent être entre -5 et 5 **/
  verifierPoints(point: number): boolean {
    return (point >= -5 && point <= 5);
  }

  /** Normalise des champs de l'arme à la sauvegarde du formulaire. **/
  normalizeForm(): void {
    this.weapon.name = this.weapon.name.substr(0,1).toUpperCase() + this.weapon.name.substr(1).toLowerCase();
  }

  getPointsRestants(): number {
    return ( this.weapon.health + this.weapon.dodge + this.weapon.damage + this.weapon.attack );
  }

  getPointsRestantsHTML(): string {
    let pointsRestants = this.getPointsRestants();
    return (pointsRestants !== 0) ? ("<font color='#FF00000'>" + pointsRestants + '</font>') : pointsRestants.toString()
  }

  goBack(): void {
    this.location.back();
  }
}
