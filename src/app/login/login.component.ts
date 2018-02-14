import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private inputs = {
    email: '',
    password: ''
  };
  private message = '';
  private userObs;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.userObs = this.authService.getUser();
  }

  login() {
    this.authService.login(this.inputs.email, this.inputs.password)
      .then(() => {
        this.message = '';
      })
      .catch(error => {
        this.message = `Error code: ${error.code} - ${error.message}`;
      });
  }

  logout() {
    this.authService.logout();
  }
}
