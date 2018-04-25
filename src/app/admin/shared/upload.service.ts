import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';

import { Upload } from './upload.model';
import { Image } from '../../shared/image.model';

import { ConvertImageService } from './convert-image.service';

@Injectable()
export class UploadService {

  constructor(
    private db: AngularFireDatabase,
    private angularFireStorage: AngularFireStorage,
    private convertImageService: ConvertImageService
  ) { }

  private imageDirectory = '/images';
  private albumsDirectory = '/albums';
  uploads: AngularFireList<Upload[]>;

  compress(upload: Upload): any {
    // Compress image
    return this.convertImageService.compress(upload.file);
  }

  upload(file, albumId) {
    // create a random id
    const randomId = Math.random().toString(36).substring(2);
    const filePath = `${this.imageDirectory}/${albumId}/${randomId}`;
    return this.angularFireStorage.upload(filePath, file);
  }

  /**
   * Writes the file details to the realtime db
   * @param upload
   */
  public saveImagesInDB(response: any, albumId: string) {
    // this.angularFireDatabase.list(`${this.basePath}/`).push(upload);
    const metadata = new Image();
    metadata.name = response.metadata.name;
    metadata.url = response.metadata.downloadURLs[0];
    metadata.albumId = albumId;
    metadata.contentType = response.metadata.contentType;
    metadata.type = response.metadata.type;
    metadata.fullPath = response.metadata.fullPath;
    metadata.size = response.metadata.size;
    metadata.bucket = response.metadata.bucket;
    metadata.createdAt = response.metadata.timeCreated;
    metadata.updatedAt = response.metadata.updated;
    return this.db.list(this.albumsDirectory).update(`${albumId}/images/${metadata.name}`, metadata)
      .then(() => console.log('Realtime Updated'));
  }

  /**
   * Deletes the file details from the realtime db
   * @param key
   */
  private deleteImageInDB(albumName: string, imageName: string) {
    return this.db.list(`${this.albumsDirectory}/${albumName}`).remove(imageName);
  }
}
