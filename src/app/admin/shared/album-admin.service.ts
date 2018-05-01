import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';

import { Album } from '../../shared/album.model';
import { ImageMetadata } from '../../shared/image-metadata.model';

import { AlbumsService } from '../../shared/albums.service';

@Injectable()
export class AlbumAdminService {

  private imageDirectory = '/images';
  private albumDirectory = '/albums';
  private imageList$: Observable<ImageMetadata[]>;

  constructor(private db: AngularFireDatabase,
    private angularFireStorage: AngularFireStorage,
    private albumsService: AlbumsService) { }

  public addAlbum(name: string): void {
    const album = new Album();
    album.name = name;
    this.db.list<Album>('albums').push(album);
  }

  public editAlbum(album: Album): Promise<void> {
    console.log('ALBUM:', album);
    return this.db.list(this.albumDirectory).update(album.id, album);
  }

  public deleteAlbum(album: Album): Promise<any> {
    // first delete in DB
    // Second delete in storage
    return this.deleteAlbumInStorage(album)
      .then(() => this.deleteAlbumInDB(album.id));
  }

  public deleteImage(image: ImageMetadata) {
    // first delete in DB
    // Second delete in storage
    return this.deleteImageInStorage(image.fullPath)
      .then(() => this.deleteImageInDB(image));
  }

  private deleteImageInDB(image: ImageMetadata): Promise<void> {
    return this.db.object(`${this.albumDirectory}/${image.albumId}/images/${image.name}`).remove();
  }

  private deleteAlbumInDB(name): Promise<void> {
    // delete album in DB
    return this.db.list(this.albumDirectory).remove(name)
      .then(() => {
        // delete images associated in DB
        return this.db.list(this.albumDirectory).remove(name);
      });
  }

  private deleteAlbumInStorage(album: Album): Promise<any> {
    const promises = new Array<Promise<any>>();
    // delete images associated in file storage (one by one)
    for (const id in album.images) {
      if (album.images.hasOwnProperty(id)) {
        const image = <ImageMetadata>album.images[id];
        promises.push(this.deleteImageInStorage(image.fullPath));
      }
    }
    return Promise.all(promises);
  }

  private deleteImageInStorage(path: string): Promise<any> {
    const storageRef = this.angularFireStorage.storage.ref();
    return storageRef.child(path).delete();
  }
}
