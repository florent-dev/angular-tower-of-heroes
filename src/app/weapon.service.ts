import { Injectable } from '@angular/core';
import {MessageService} from "./message.service";
import {Observable, of} from "rxjs";
import {Weapon} from "./data/weapon";
import {WEAPONS} from "./data/mock-weapons";

@Injectable({
  providedIn: 'root'
})
export class WeaponService {

  constructor(private messageService: MessageService) { }

  getWeapons(): Observable<Weapon[]> {
    this.messageService.add('WeaponService: arme lue');
    return of(WEAPONS);
  }

  getWeapon(id: number): Observable<Weapon> {
    this.messageService.add(`WeaponService: arme id=${id} lue`);
    return of(WEAPONS.find(weapon => weapon.id === id));
  }
}
