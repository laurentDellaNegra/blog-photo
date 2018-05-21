import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireStorage, AngularFireStorageReference } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';

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

  // uploadOld(upload: Upload, albumId) {
  //   // create a random id
  //   const randomId = Math.random().toString(36).substring(2);
  //   const filePath = `${this.imageDirectory}/${albumId}/${randomId}`;
  //   return this.compress(upload)
  //     .then((fileCompressed) => {
  //       return this.angularFireStorage.upload(filePath, fileCompressed)
  //         .then((response) => this.saveImagesInDB(response, albumId, fileCompressed.width, fileCompressed.height));
  //     });
  // }

  upload(upload: Upload, albumId) {
    // create a random id
    const randomId = Math.random().toString(36).substring(2);
    const filePath = `${this.imageDirectory}/${albumId}/${randomId}`;
    // file ref in db
    const fileRef = this.angularFireStorage.ref(filePath);

    return this.compress(upload).then((fileCompressed) => {
      // upload
      const task = this.angularFireStorage.upload(filePath, fileCompressed);
      // observe percentage changes
      // const uploadPercent = task.percentageChanges();
      task.snapshotChanges().pipe(
        finalize(() => {
          // const downloadURL = fileRef.getDownloadURL();
          this.saveImagesInDB(fileRef, albumId, fileCompressed.width, fileCompressed.height);
        })
      )
        .subscribe();
    });
  }

  /**
   * Writes the file details to the realtime db
   * @param upload
   */
  public saveImagesInDB(fileRef: AngularFireStorageReference, albumId: string, width: number, height: number) {
    fileRef.getMetadata().subscribe(metadata => {
      const image = new ImageMetadata();
      image.name = metadata.name;
      image.albumId = albumId;
      image.contentType = metadata.contentType;
      image.type = metadata.type;
      image.fullPath = metadata.fullPath;
      image.size = metadata.size;
      image.bucket = metadata.bucket;
      image.createdAt = metadata.timeCreated;
      image.updatedAt = metadata.updated;
      image.w = width;
      image.h = height;
      fileRef.getDownloadURL().subscribe(downloadUrl => {
        image.src = downloadUrl;
        image.url = downloadUrl;
        image.urlThumb = downloadUrl.replace(image.name, `thumb_${image.name}`);
        return this.db.list(this.albumsDirectory).update(`${albumId}/images/${image.name}`, image)
          .then(() => {
            console.log('Realtime Updated (metadata)');
          });
      });
    });
  }

  /**
   * Writes the file details to the realtime db
   * @param upload
   */
  // public saveImagesInDBOld(response: any, albumId: string, width: number, height: number) {
  //   console.log(response);
  //   response.ref.getMetadata().then((metadata) => {
  //     const image = new ImageMetadata();
  //     image.name = response.metadata.name;
  //     image.url = response.metadata.downloadURLs[0];
  //     image.albumId = albumId;
  //     image.contentType = response.metadata.contentType;
  //     image.type = response.metadata.type;
  //     image.fullPath = response.metadata.fullPath;
  //     image.size = response.metadata.size;
  //     image.bucket = response.metadata.bucket;
  //     image.createdAt = response.metadata.timeCreated;
  //     image.updatedAt = response.metadata.updated;
  //     image.src = response.metadata.downloadURLs[0];
  //     image.w = width;
  //     image.h = height;
  //     return this.db.list(this.albumsDirectory).update(`${albumId}/images/${image.name}`, image)
  //       .then(() => {
  //         console.log('Realtime Updated');
  //       });
  //   });
  // }

  /**
   * Deletes the file details from the realtime db
   * @param key
   */
  // public deleteImageInDB(albumName: string, imageName: string) {
  //   return this.db.list(`${this.albumsDirectory}/${albumName}`).remove(imageName);
  // }
}
