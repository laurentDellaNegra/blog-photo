import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Upload } from './upload.model';
import { AngularFireStorage } from 'angularfire2/storage';
import { Image } from '../../shared/image.model';

@Injectable()
export class UploadService {

  constructor(private db: AngularFireDatabase, private angularFireStorage: AngularFireStorage) { }

  private imageDirectory = '/images';
  private albumsDirectory = '/albums';
  uploads: AngularFireList<Upload[]>;

  /**
   *
   * @param upload
   */
  // pushUploadWithFormat(upload: Upload, subDirectory: string): any {

  //   // create a random id
  //   const randomId = Math.random().toString(36).substring(2);
  //   const filePath = `${this.directory}/${subDirectory}/${randomId}`;

  //   // Format image
  //   const file = upload.file;
  //   const file64 = this.getBase64(file);
  //   return this.generateThumbnail(file64, 300, 300, 1)
  //     .then(file64Compressed => {
  //       return this.urltoFile(file64Compressed, randomId, 'image/jpeg')
  //     })
  //     .then(function (file) {
  //       return this.angularFireStorage.upload(filePath, file);
  //     })
  //     .then((resp: any) => {
  //       const metadata = new ImageMetadata();
  //       metadata.name = resp.metadata.name;
  //       metadata.url = resp.metadata.downloadURLs[0];
  //       metadata.contentType = resp.metadata.contentType;
  //       metadata.type = resp.metadata.type;
  //       metadata.fullPath = resp.metadata.fullPath;
  //       metadata.size = resp.metadata.size;
  //       metadata.bucket = resp.metadata.bucket;
  //       metadata.createdAt = resp.metadata.timeCreated;
  //       metadata.updatedAt = resp.metadata.updated;
  //       this.saveFileData(subDirectory, metadata);
  //     })
  //     .catch(error => console.log(error));
  // }

  pushUpload(upload: Upload, albumName: string): any {

    // create a random id
    const randomId = Math.random().toString(36).substring(2);
    const filePath = `${this.imageDirectory}/${albumName}/${randomId}`;
    const task = this.angularFireStorage.upload(filePath, upload.file);
    task.then((resp: any) => {
      const metadata = new Image();
      metadata.name = resp.metadata.name;
      metadata.url = resp.metadata.downloadURLs[0];
      metadata.albumId = albumName;
      metadata.contentType = resp.metadata.contentType;
      metadata.type = resp.metadata.type;
      metadata.fullPath = resp.metadata.fullPath;
      metadata.size = resp.metadata.size;
      metadata.bucket = resp.metadata.bucket;
      metadata.createdAt = resp.metadata.timeCreated;
      metadata.updatedAt = resp.metadata.updated;
      return this.saveImagesInDB(albumName, metadata);
    })
      .catch(error => console.log(error));
    return task;
  }

  getImages() {
    console.log(this.angularFireStorage.storage.ref(this.imageDirectory));
  }

  /**
   * Writes the file details to the realtime db
   * @param upload
   */
  private saveImagesInDB(albumName: string, metadata) {
    // this.angularFireDatabase.list(`${this.basePath}/`).push(upload);
    this.db.list(this.albumsDirectory).update(`${albumName}/images/${metadata.name}`, metadata).then(() => console.log('Realtime Updated'));
  }

  /**
   * Deletes the file details from the realtime db
   * @param key
   */
  private deleteImageInDB(albumName: string, imageName: string) {
    return this.db.list(`${this.albumsDirectory}/${albumName}`).remove(imageName);
  }
}
