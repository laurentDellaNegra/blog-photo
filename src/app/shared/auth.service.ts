import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { User } from '@firebase/auth-types';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

  public redirectUrl: string;
  private userObs: Observable<User>;
  private userDetail: User = null;

  constructor(public angularFireAuth: AngularFireAuth, public router: Router) {
    this.userObs = this.angularFireAuth.authState;
    this.userObs.subscribe(user => {
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

  getUser(): Observable<User> {
    return this.userObs;
  }
}
