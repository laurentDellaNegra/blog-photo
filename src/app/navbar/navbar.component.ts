import { Component, OnInit } from '@angular/core';

import { AlbumsService } from '../services/albums.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private isNavbarCollapsed = true;
  private albumsName: Array<string> = [];

  constructor(public albumsService: AlbumsService) { }

  ngOnInit() {
    this.getAlbumsName();
  }

  getAlbumsName(): void {
    this.albumsService.getAlbums().forEach(album => {
      this.albumsName.push(album.name);
    });
  }
}
