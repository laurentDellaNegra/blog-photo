import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { AlbumsService } from '../services/albums.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit, OnChanges {

  public album$: Observable<any>;
  private sub: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private albumsService: AlbumsService
  ) { }

  ngOnInit() {
    // this.sub = this.route.params.subscribe(params => {
    //   const id = params['id'];
    //   this.getAlbum(id);
    // });
    this.album$ = this.route.paramMap
    .switchMap((params: ParamMap) =>
      this.getAlbum(params.get('id'))
    );
  }

  ngOnChanges() {
    console.log('Updated');
  }

  getAlbum(id: string) {
    return this.albumsService.getAlbum(id);
  }
}
