import { Component, OnInit } from '@angular/core';
import {WeaponService} from "../services/weapon.service";
import {Weapon} from "../entity/weapon";
import {MessageService} from "../services/message.service";

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.css']
})
export class WeaponsComponent implements OnInit {
  weapons: Weapon[];
  newWeapon: Weapon;
  info = '';

  constructor(private weaponService: WeaponService, private messageService: MessageService) { }

  ngOnInit() {
    this.getWeapons();
    this.newWeapon = new Weapon();
  }

  getWeapons() {
    this.weaponService.getWeapons()
      .subscribe(weapons => this.weapons = weapons);
  }

  addWeapon() {
    if (this.isValid()) {
      this.weaponService.addWeapon(this.newWeapon);
      this.messageService.add("Création d'une nouvelle arme");
    }
  }

  isValid(): boolean {
    this.info = '';

    if (this.newWeapon.name === '')
      this.info = 'Veuillez indiquer un nom au héro';

    return (this.info !== '');
  }
}
