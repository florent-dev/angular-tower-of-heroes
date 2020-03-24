import { Component, OnInit } from '@angular/core';
import {WeaponService} from "../services/weapon.service";
import {Weapon} from "../entity/weapon";

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.css']
})
export class WeaponsComponent implements OnInit {
  weapons: Weapon[];
  elements: any = [];
  filterElements = ['name', 'attack', 'health', 'damage', 'dodge'];

  constructor(private weaponService: WeaponService) { }

  ngOnInit() {
    this.getWeapons();
  }

  getWeapons(): void {
    this.weaponService.getWeapons().subscribe(weapons => this.weapons = weapons);
  }

  deleteWeapon(weapon: Weapon): void {
    this.weaponService.deleteWeapon(weapon.id.toString());
  }

}
