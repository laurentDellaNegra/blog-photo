import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { AlbumsService } from '../shared/albums.service';
import { Album } from '../shared/album.model';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {


  public albums: any;

  constructor(
    public albumsService: AlbumsService,
    private route: ActivatedRoute,
    public authService: AuthService) { }

  ngOnInit() {
    this.albumsService.getAlbums()
      .subscribe((albums: Album[]) => {
        this.albums = albums.map((alb: any) => {
          alb.previewImage = alb.images[Object.keys(alb.images)[0]].url;
          return alb;
        });
      });
  }

}
