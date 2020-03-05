import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeroesComponent} from './heroes/heroes.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
import {MessagesComponent} from './messages/messages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {WeaponDetailComponent} from './weapon-detail/weapon-detail.component';
import {WeaponsComponent} from './weapons/weapons.component';
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire";
import {AngularFirestoreModule} from "@angular/fire/firestore";

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    WeaponsComponent,
    WeaponDetailComponent,
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
