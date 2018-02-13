import { Component, OnInit } from '@angular/core';

import { User } from './user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: User = new User('', '');
  private message = '';
  private authState;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authState = this.authService.getAuthState();
  }

  login() {
    this.authService.login(this.user.email, this.user.password)
      .then((message) => {
        this.message = message;
      })
      .catch(error => {
        this.message = `Error code: ${error.code} - ${error.message}`;
      });
  }

  logout() {
    this.authService.logout();
  }
}
