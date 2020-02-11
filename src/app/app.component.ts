import { Component } from '@angular/core';
import * as firebase from "firebase";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Tower of Heroes';

  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyDGIaoTxLr73o8daa8ryDnkEBy1PZ3VDdI",
      authDomain: "towerofheroes-3079c.firebaseapp.com",
      databaseURL: "https://towerofheroes-3079c.firebaseio.com",
      projectId: "towerofheroes-3079c",
      storageBucket: "towerofheroes-3079c.appspot.com",
      messagingSenderId: "656125512159",
      appId: "1:656125512159:web:aaca69e4cc8e3e27ed1c6a",
      measurementId: "G-6EB54L74ZW"
    };
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }
}
