import { Injectable } from '@angular/core';
import {MessageService} from "./message.service";
import {Observable, of} from "rxjs";
import {Weapon} from "../entity/weapon";
import {map} from "rxjs/operators";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class WeaponService {

  private static url = 'weapons';

  constructor(private messageService: MessageService, private db: AngularFirestore) { }

  // Récupération des héros
  getWeapons(): Observable<Weapon[]> {

    //
    return this.db.collection<Weapon>(WeaponService.url)
      .snapshotChanges()
      .pipe(
        map(liste => {

          // log
          console.log('getWeapons()');

          // Traitement de la liste
          return liste.map(item => {

            // Get document data
            const data = item.payload.doc.data();

            const weapon = new Weapon().fromJSON(data);

            // Get document id
            const id = item.payload.doc.id;
            weapon.id = id;

            // log
            console.log('   weapon ' + id);

            // Use spread operator to add the id to the document data
            return weapon;

          });
        })
      );
  }

  // Récupération d'une arme en fonction de son id
  getWeapon(id: string): Observable<Weapon> {

    // Return weapon observable
    return this.getWeaponDocument(id).snapshotChanges()
      .pipe(
        map(item => {

          // Get document data
          // @ts-ignore
          const data = item.payload.data();

          const weapon = new Weapon().fromJSON(data);
          weapon.id = id;

          // log
          console.log('getWeapon(' + id + ')');

          // Use spread operator to add the id to the document data
          return weapon;
        })
      );
  }

  // Ajout d'une arme
  addWeapon(weapon: Weapon) {
    this.db.collection<Weapon>(WeaponService.url).add(Object.assign({}, weapon));
  }

  // Modification d'une arme
  updateWeapon(weapon: Weapon) {

    // Update document
    this.getWeaponDocument(weapon.id.toString()).update(Object.assign({}, weapon));
  }

  // Suppression d'une arme
  deleteWeapon(id: string) {

    // Delete the document
    this.getWeaponDocument(id).delete();
  }


  // Création du service Firebase en fonction de l'id de l'arme
  private getWeaponDocument(id: string): AngularFirestoreDocument<Weapon> {

    // return document
    return this.db.doc<Weapon>(WeaponService.url + `/` + id);
  }
}
