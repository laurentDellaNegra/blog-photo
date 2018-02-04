import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AlbumsService } from '../services/albums.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit, OnChanges {

  private album: any = {};
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private albumsService: AlbumsService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      this.getAlbum(id);
    });
  }

  ngOnChanges() {
    console.log('Updated');
  }

  getAlbum(id: string): void {
    this.album = this.albumsService.getAlbum(id);
    console.log(this.album);
  }
}
