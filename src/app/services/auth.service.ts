import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(public angularFireAuth: AngularFireAuth, public router: Router) {
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
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        if (this.redirectUrl) {
          console.log(this.redirectUrl);
          this.router.navigate([this.redirectUrl]);
          this.redirectUrl = '';
        }
      });
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
