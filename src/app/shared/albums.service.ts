import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireAction, DatabaseSnapshot } from 'angularfire2/database';

import { Album } from './album.model';
import { Image } from './image.model';

@Injectable()
export class AlbumsService {

  private albumDirectory = '/albums';

  constructor(private db: AngularFireDatabase) { }

  getAlbums(): Observable<Album[]> {
    return this.db.list<Album>(this.albumDirectory)
      .snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.val();
          const id = a.payload.key;
          let album = new Album();
          album = { id, ...data };
          return album;
        });
      });
  }

  getAlbum(id: string): Observable<Album> {
    return this.getAlbums()
      .map(albums => albums.find(album => album.id === id));

  }

  getImagesInDB(albumId: string): Observable<Image[]> {
    return this.db.list<Image>(`${this.albumDirectory}/${albumId}/images`)
      .snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.val();
          const id = a.payload.key;
          let image = new Image();
          image = { id, ...data };
          return image;
        });
      });
  }

  getImageInDB(albumName: string, name: string): Observable<Image> {
    return this.getImagesInDB(albumName)
      .map(images => images.find(image => image.name === name));

  }
}
