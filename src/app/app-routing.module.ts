import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroComponent }  from './hero/hero.component';
import { WeaponsComponent } from "./weapons/weapons.component";
import {FightComponent} from "./fight/fight.component";
import {WeaponComponent} from "./weapon/weapon.component";


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'weapons', component: WeaponsComponent },
  { path: 'hero/:id', component: HeroComponent },
  { path: 'hero', component: HeroComponent },
  { path: 'weapon/:id', component: WeaponComponent },
  { path: 'weapon', component: WeaponComponent },
  { path: 'fight', component: FightComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
