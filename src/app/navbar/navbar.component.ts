import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { AlbumsService } from '../shared/albums.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isNavbarCollapsed = true;

  public albums$: Observable<any>;

  constructor(
    public albumsService: AlbumsService,
    public route: ActivatedRoute,
    public authService: AuthService) { }

  ngOnInit() {
    this.albums$ = this.albumsService.getAlbums();
  }
}
