import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';

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
    public authService: AuthService,
    public progress: NgProgress
  ) { }

  ngOnInit() {
    this.progress.start();
    this.albumsService.getAlbums()
      .subscribe((albums: Album[]) => {
        this.albums = albums.map((alb: any) => {
          alb.previewImage = alb.images[Object.keys(alb.images)[0]].url;
          return alb;
        }
        );
      });
  }

}
