import { Injectable } from '@angular/core';

import {Observable} from 'rxjs';
import { MessageService } from './message.service';

import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {map} from "rxjs/operators";
import {Hero} from "../entity/hero";


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private static url = 'heroes';

  constructor(private messageService: MessageService, private db: AngularFirestore) {}

  // Récupération des héros
  getHeroes(): Observable<Hero[]> {

    //
    return this.db.collection<Hero>(HeroService.url)
      .snapshotChanges()
      .pipe(
        map(liste => {

          // log
          console.log('getHeroes()');

          // Traitement de la liste
          return liste.map(item => {

            // Get document data
            const data = item.payload.doc.data();

            const hero = new Hero().fromJSON(data);

            // Get document id
            const id = item.payload.doc.id;
            hero.id = id;

            // log
            console.log('   hero ' + id);

            // Use spread operator to add the id to the document data
            return hero;

          });
        })
      );
  }

  // Récupération d'un héro en fonction de son id
  getHero(id: string): Observable<Hero> {

    // Return hero observable
    return this.getHeroDocument(id).snapshotChanges()
      .pipe(
        map(item => {

          // Get document data
          const data = item.payload.data();

          const hero = new Hero().fromJSON(data);
          hero.id = id;

          // log
          console.log('getHero(' + id + ')');

          // Use spread operator to add the id to the document data
          return hero;
        })
      );
  }

  // Ajout d'un héro
  addHero(hero: Hero) {
    this.db.collection<Hero>(HeroService.url).add(Object.assign({}, hero));
  }

  // Modification d'un héro
  updateHero(hero: Hero) {

    // Update document
    this.getHeroDocument(hero.id.toString()).update(Object.assign({}, hero));
  }

  // Suppression d'un héro
  deleteHero(id: string) {

    // Delete the document
    this.getHeroDocument(id).delete();
  }


  // Création du service Firebase en fonction de l'id du héro
  private getHeroDocument(id: string): AngularFirestoreDocument<Hero> {

    // return document
    return this.db.doc<Hero>(HeroService.url + `/` + id);
  }
}
