import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireAction, DatabaseSnapshot } from 'angularfire2/database';

import { Album } from './album.model';
import { ImageMetadata } from './image-metadata.model';

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

  getImagesInDB(albumId: string): Observable<ImageMetadata[]> {
    return this.db.list<ImageMetadata>(`${this.albumDirectory}/${albumId}/images`)
      .snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.val();
          const id = a.payload.key;
          let image: any;
          image = { id, ...data };
          return image;
        });
      });
  }

  getImagesInDBPaginated(albumId: string, batch, lastKey?) {
    let query;
    if (lastKey) {
      query = ref => ref.startAt(lastKey).orderByKey().limitToFirst(batch);
    } else {
      query = ref => ref.orderByKey().limitToFirst(batch);
    }
    // , ref => ref.orderByKey().limitToFirst(batch)
    return this.db.list(`${this.albumDirectory}/${albumId}/images`, query)
      .snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.val();
          const id = a.payload.key;
          let image: any;
          image = { id, ...data };
          return image;
        });
      });
  }

  getImageInDB(albumName: string, name: string): Observable<ImageMetadata> {
    return this.getImagesInDB(albumName)
      .map(images => images.find(image => image.name === name));

  }
}
