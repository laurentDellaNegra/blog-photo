import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';

import { Album } from '../../shared/album.model';
import { ImageMetadata } from '../../shared/image-metadata.model';

// import { AlbumsService } from '../../shared/albums.service';

@Injectable()
export class AlbumAdminService {

  // private imageDirectory = '/images';
  private albumDirectory = '/albums';

  constructor(private db: AngularFireDatabase,
    private angularFireStorage: AngularFireStorage) { }

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
    return this.deleteImageInStorage(image)
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
        promises.push(this.deleteImageInStorage(image));
      }
    }
    return Promise.all(promises);
  }

  private deleteImageInStorage(image: ImageMetadata): Promise<any> {
    const storageRef = this.angularFireStorage.storage.ref();
    const imagePath = image.fullPath;
    const imageThumbPath = image.fullPath.replace(image.name, `thumb_${image.name}`);
    // TODO: chain
    storageRef.child(imageThumbPath).delete();
    // Delete image
    return storageRef.child(image.fullPath).delete();
  }
}
