import {Weapon} from "./weapon";

export class Hero {
  id: number;
  name: string;
  attack: number;
  dodge: number;
  damage: number;
  health: number;
  weapon?: Weapon;
}
