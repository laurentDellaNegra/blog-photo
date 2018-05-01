import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';

import { Upload } from './upload.model';
import { ImageMetadata } from '../../shared/image-metadata.model';

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
    // Compress image & get width and size
    return this.convertImageService.compress(upload.file)
      .then((fileCompressed) => {
        return this.getWidthAndHeight(fileCompressed);
      });
  }

  // GET THE IMAGE WIDTH AND HEIGHT USING fileReader() API.
  getWidthAndHeight(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader(); // CREATE AN NEW INSTANCE.
      reader.onload = (e: any) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = (event: any) => {
          const w = event.target.width;
          const h = event.target.height;
          file.width = w;
          file.height = h;
          resolve(file);
        };
      };
      reader.readAsDataURL(file);
    });
  }

  upload(upload: Upload, albumId) {
    // create a random id
    const randomId = Math.random().toString(36).substring(2);
    const filePath = `${this.imageDirectory}/${albumId}/${randomId}`;
    return this.compress(upload)
      .then((fileCompressed) => {
        return this.angularFireStorage.upload(filePath, fileCompressed)
          .then((response) => this.saveImagesInDB(response, albumId, fileCompressed.width, fileCompressed.height));
      });
  }

  /**
   * Writes the file details to the realtime db
   * @param upload
   */
  public saveImagesInDB(response: any, albumId: string, width: number, height: number) {
    // this.angularFireDatabase.list(`${this.basePath}/`).push(upload);
    console.log(response);
    const image = new ImageMetadata();
    image.name = response.metadata.name;
    image.url = response.metadata.downloadURLs[0];
    image.albumId = albumId;
    image.contentType = response.metadata.contentType;
    image.type = response.metadata.type;
    image.fullPath = response.metadata.fullPath;
    image.size = response.metadata.size;
    image.bucket = response.metadata.bucket;
    image.createdAt = response.metadata.timeCreated;
    image.updatedAt = response.metadata.updated;
    image.src = response.metadata.downloadURLs[0];
    image.w = width;
    image.h = height;
    return this.db.list(this.albumsDirectory).update(`${albumId}/images/${image.name}`, image)
      .then(() => {
        console.log('Realtime Updated');
      });
  }

  /**
   * Deletes the file details from the realtime db
   * @param key
   */
  private deleteImageInDB(albumName: string, imageName: string) {
    return this.db.list(`${this.albumsDirectory}/${albumName}`).remove(imageName);
  }
}
