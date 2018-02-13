import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { User } from './user';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  private user: User = new User('', '');
  private message = '';

  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password)
      .then(() => {
        this.message = 'Logged in';
      })
      .catch(error => {
        this.message = `Error code: ${error.code} - ${error.message}`;
      });
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
