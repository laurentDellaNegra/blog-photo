import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { AlbumsService } from '../shared/albums.service';
import { Image } from '../shared/image.model';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  public album$: Observable<any>;
  imageList$: Observable<Image[]>;

  constructor(
    private route: ActivatedRoute,
    private albumsService: AlbumsService
  ) { }

  ngOnInit() {
    this.album$ = this.route.paramMap
      .switchMap((params: ParamMap) => {
        const albumId = params.get('id');
        this.imageList$ = this.albumsService.getImagesInDB(albumId);
        return this.albumsService.getAlbum(albumId);
      });
  }
}
