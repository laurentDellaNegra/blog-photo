import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AlbumsService } from '../../services/albums.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  private album: any = {};

  constructor(
    private route: ActivatedRoute,
    private albumsService: AlbumsService
  ) { }

  ngOnInit() {
    this.getAlbum();
  }

  getAlbum(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.album = this.albumsService.getAlbum(id);
    console.log(this.album);
  }
}
