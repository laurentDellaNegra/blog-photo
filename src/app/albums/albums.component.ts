import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { AlbumsService } from '../shared/albums.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {


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
