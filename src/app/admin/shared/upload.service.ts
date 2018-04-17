import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Upload } from './upload';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { ImageMetadata } from './ImageMetadata';

@Injectable()
export class UploadService {

  constructor(private db: AngularFireDatabase, private angularFireStorage: AngularFireStorage) { }

  private directory = '/images';
  uploads: AngularFireList<Upload[]>;

  /**
   *
   * @param upload
   */
  pushUpload(upload: Upload, subDirectory: string): any {

    // create a random id
    const randomId = Math.random().toString(36).substring(2);
    const filePath = `${this.directory}/${subDirectory}/${randomId}`;

    // Format image
    const file = upload.file;
    const file64 = this.getBase64(file);
    return this.generateThumbnail(file64, 300, 300, 1)
      .then(file64Compressed => {
        return this.urltoFile(file64Compressed, randomId, 'image/jpeg')
      })
      .then(function (file) {
        this.angularFireStorage.upload(filePath, file);
      })
      .then((resp: any) => {
        const metadata = new ImageMetadata();
        metadata.name = resp.metadata.name;
        metadata.url = resp.metadata.downloadURLs[0];
        metadata.contentType = resp.metadata.contentType;
        metadata.type = resp.metadata.type;
        metadata.fullPath = resp.metadata.fullPath;
        metadata.size = resp.metadata.size;
        metadata.bucket = resp.metadata.bucket;
        metadata.createdAt = resp.metadata.timeCreated;
        metadata.updatedAt = resp.metadata.updated;
        this.saveFileData(subDirectory, metadata);
      })
      .catch(error => console.log(error));
  }

  getImages() {
    console.log(this.angularFireStorage.storage.ref('/images'));
  }

  /**
   * Writes the file details to the realtime db
   * @param upload
   */
  private saveFileData(albumKey: string, metadata) {
    // this.angularFireDatabase.list(`${this.basePath}/`).push(upload);
    this.db.list('images').update(`${albumKey}/${metadata.name}`, metadata);
    console.log('Realtime Updated');
  }

  /**
   *
   * @param upload
   */
  deleteUpload(upload: Upload) {
    this.deleteFileData(upload.$key)
      .then(() => {
        this.deleteFileStorage(upload.name);
      })
      .catch(error => console.log(error));
  }

  /**
   * Deletes the file details from the realtime db
   * @param key
   */
  private deleteFileData(key: string) {
    return this.db.list(`${this.directory}/`).remove(key);
  }

  /**
   * Firebase files must have unique names in their respective storage dir
   *  So the name serves as a unique key
   * @param name
   */
  private deleteFileStorage(name: string) {
    const storageRef = this.angularFireStorage.storage.ref();
    storageRef.child(`${this.directory}/${name}`).delete();
  }

  /**
   * Conserve aspect ratio of the original region. Useful when shrinking/enlarging
   * images to fit into a certain area.
   * Source:  http://stackoverflow.com/a/14731922
   *
   * @param {Number} srcWidth Source area width
   * @param {Number} srcHeight Source area height
   * @param {Number} maxWidth Nestable area maximum available width
   * @param {Number} maxHeight Nestable area maximum available height
   * @return {Object} { width, height }
   */
  private calculateAspectRatioFit(srcWidth: number, srcHeight: number, maxWidth: number, maxHeight: number): any {
    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return { width: srcWidth * ratio, height: srcHeight * ratio };
  };

  /**
   Reduce imagen size and quality.
   @param {String} imagen is a base64 string
   @param {Number} width
   @param {Number} height
   @param {Number} quality from 0.1 to 1.0
   @return Promise.<String>
   **/
  private generateThumbnail(imagen: string, width: number, height: number, quality: number) {
    return new Promise((resolve, reject) => {
      const canvasElement = document.createElement('canvas');
      const imagenElement = document.createElement('img');
      imagenElement.onload = () => {
        const dimensions = this.calculateAspectRatioFit(imagenElement.width, imagenElement.height, width, height);
        canvasElement.width = dimensions.width;
        canvasElement.height = dimensions.height;
        const context = canvasElement.getContext('2d');
        context.drawImage(imagenElement, 0, 0, dimensions.width, dimensions.height);
        resolve(canvasElement.toDataURL('image/WebP', quality));
      };
      imagenElement.src = imagen;
    });
  };

  private getBase64(file): any {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      return reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  //return a promise that resolves with a File instance
  private urltoFile(url, filename, mimeType) {
    return (fetch(url)
      .then(function (res) { return res.arrayBuffer(); })
      .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
    );
  }
}
