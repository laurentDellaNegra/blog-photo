import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { AlbumsService } from '../services/albums.service';
import { Image } from '../model/Image';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  public album$: Observable<any>;
  imageList$: Observable<Image[]>;
  private sub: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private albumsService: AlbumsService
  ) { }

  ngOnInit() {
    this.album$ = this.route.paramMap
      .switchMap((params: ParamMap) => {
        return this.albumsService.getAlbum(params.get('id'));
      });


    this.imageList$ = this.albumsService.getImages();
  }
}
