import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';

import { Album } from './album.model';
import { Image } from './image.model';

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

  getImages(): Observable<Array<Image>> {
    return this.db.list<Image>('images/toto').valueChanges();
  }

  getImage(name: string): Observable<Image> {
    return this.getImages()
      .map(images => images.find(image => image.name === name));

  }
}
