import { Component, OnInit } from '@angular/core';

import { AlbumsService } from '../services/albums.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private isNavbarCollapsed = true;
  private albums: Array<any> = [];

  constructor(public albumsService: AlbumsService) { }

  ngOnInit() {
    this.getAlbums();
  }

  getAlbums(): void {
    this.albums = this.albumsService.getAlbums();
  }
}
