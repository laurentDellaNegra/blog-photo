import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { AlbumsService } from '../services/albums.service';

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
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.albums$ = this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.albumsService.getAlbums()
      );
  }
}
