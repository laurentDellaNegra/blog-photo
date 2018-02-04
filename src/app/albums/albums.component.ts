import { Component, OnInit } from '@angular/core';

import { AlbumsService } from '../services/albums.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {


  public albums: Array<any> = [];

  constructor(public albumsService: AlbumsService) { }

  ngOnInit() {
    this.getAlbums();
  }

  getAlbums(): void {
    this.albums = this.albumsService.getAlbums();
  }

}
