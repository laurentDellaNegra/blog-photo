import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';

import { Album } from './album.model';
import { Image } from './image.model';

@Injectable()
export class AlbumsService {

  private albumDirectory = '/albums';

  constructor(private db: AngularFireDatabase) { }

  getAlbums(): Observable<Array<Album>> {
    return this.db.list<Album>(this.albumDirectory).valueChanges();
  }

  getAlbum(id: string): Observable<Album> {
    return this.getAlbums()
      .map(albums => albums.find(album => album.id === id));

  }

  getImagesInDB(albumName): Observable<Image[]> {
    return this.db.list<Image>(`${this.albumDirectory}/${albumName}/images`).valueChanges();
  }

  getImageInDB(albumName: string, name: string): Observable<Image> {
    return this.getImagesInDB(albumName)
      .map(images => images.find(image => image.name === name));

  }
}
