import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { Album } from '../../shared/album.model';

@Injectable()
export class AlbumsAdminService {

  constructor(private db: AngularFireDatabase) { }

  addAlbum(name: string): void {
    const album = new Album(name);
    this.db.list<Album>('albums').push(album);
  }

  deleteAlbum(id): void {
    this.db.list<Album>('albums').remove(id + '');
  }
}
