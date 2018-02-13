import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '@firebase/auth-types';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

  public redirectUrl: string;
  public isLoggedIn = false;

  constructor(public angularFireAuth: AngularFireAuth) { }

  login(email: string, password: string) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.isLoggedIn = true;
        return 'Logged in';
      })
      .catch(error => {
        this.isLoggedIn = false;
        return `Error code: ${error.code} - ${error.message}`;
      });
  }

  logout() {
    this.angularFireAuth.auth.signOut();
    this.isLoggedIn = false;
  }

  getAuthState(): Observable<User> {
    return this.angularFireAuth.authState;
  }
}
