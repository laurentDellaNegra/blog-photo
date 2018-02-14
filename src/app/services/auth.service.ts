import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '@firebase/auth-types';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

  public redirectUrl: string;
  private user: Observable<User>;
  private userDetail: User = null;

  constructor(public angularFireAuth: AngularFireAuth) {
    this.user = this.angularFireAuth.authState;
    this.user.subscribe(user => {
      if (user) {
        this.userDetail = user;
      } else {
        this.userDetail = null;
      }
    });
  }

  login(email: string, password: string) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.angularFireAuth.auth.signOut();
  }

  isLoggedIn() {
    return (this.userDetail !== null);
  }

  isAuthorized() {
    return this.isLoggedIn();
  }

  getUser() {
    return this.user;
  }
}
