import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';

import { Album } from '../model/Album';
import { Photo } from '../model/Photo';

@Injectable()
export class AlbumsService {

  constructor(private db: AngularFireDatabase) { }

  getAlbums(): Observable<Array<Album>> {
    console.log(this.db.list<Album>('albums').valueChanges());
    return this.db.list<Album>('albums').valueChanges();
  }

  getAlbum(id: string): Observable<Album> {
    return this.getAlbums()
      .map(albums => albums.find(album => album.id === id));

  }

  // Admin feature, move this
  addAlbum(name: string): void {
    const album = new Album(name);
    this.db.list<Album>('albums').push(album);
  }

  deleteAlbum(id): void {
      this.db.list<Album>('albums').remove(id + '');
  }
}
