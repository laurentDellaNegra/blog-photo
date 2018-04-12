import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Upload } from './upload';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';

@Injectable()
export class UploadService {

  constructor(private angularFireDatabase: AngularFireDatabase, private angularFireStorage: AngularFireStorage) { }

  private basePath = '/images';
  uploads: AngularFireList<Upload[]>;

  /**
   *
   * @param upload
   */
  pushUpload(upload: Upload): AngularFireUploadTask {

    // create a random id
    const randomId = Math.random().toString(36).substring(2);
    const filePath = `${this.basePath}/${randomId}`;
    const task = this.angularFireStorage.upload(filePath, upload.file);
    task
      .then(() => {
        this.saveFileData(upload);
        console.log(upload);
      })
      .catch(error => console.log(error));

    return task;
  }

  getImages() {
    console.log(this.angularFireStorage.storage.ref('/images'));
  }

  /**
   * Writes the file details to the realtime db
   * @param upload
   */
  private saveFileData(upload: Upload) {
    // this.angularFireDatabase.list(`${this.basePath}/`).push(upload);
    this.angularFireDatabase.list('images').push(upload);
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
    return this.angularFireDatabase.list(`${this.basePath}/`).remove(key);
  }

  /**
   * Firebase files must have unique names in their respective storage dir
   *  So the name serves as a unique key
   * @param name
   */
  private deleteFileStorage(name: string) {
    const storageRef = this.angularFireStorage.storage.ref();
    storageRef.child(`${this.basePath}/${name}`).delete();
  }
}
