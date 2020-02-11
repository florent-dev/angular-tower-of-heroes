import {Weapon} from "./weapon";

export class Hero {
  id: number;
  name: string;
  attack: number;
  dodge: number;
  damage: number;
  health: number;
  weapon?: Weapon;

  constructor(name: string, attack: number, dodge: number, damage: number, health: number) {
    this.name = name;
    this.attack = attack;
    this.dodge = dodge;
    this.damage = damage;
    this.health = health;
  }
}
