import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeroesComponent} from './heroes/heroes.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HeroComponent} from './hero/hero.component';
import {MessagesComponent} from './messages/messages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {WeaponComponent} from './weapon/weapon.component';
import {WeaponsComponent} from './weapons/weapons.component';
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import { FightComponent } from './fight/fight.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroComponent,
    MessagesComponent,
    DashboardComponent,
    WeaponsComponent,
    WeaponComponent,
    FightComponent,
  ],
    imports: [
        AppRoutingModule,
        FormsModule,
        BrowserModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        ReactiveFormsModule,
        // imports firebase/firestore, only needed for database features
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
