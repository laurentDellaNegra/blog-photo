import { Injectable } from '@angular/core';
import { Image2 } from './image2.model';

@Injectable()
export class LightboxService {

  gallery: { [key: string]: Image2[] } = {};

  constructor() {

  }

  public createGallery(key: string) {
    this.gallery[key] = [];
  }

  public setImages(key: string, images: Image2[]) {
    this.gallery[key] = images;
  }

  public addImage(key: string, image: Image2) {
    if (key in this.gallery) {
      this.gallery[key].push(image);
    } else {
      throw new Error(`gallery '${key}' does not exist`);
    }
  }

  public getImages(key: string): Image2[] {
    return this.gallery[key];
  }

  public removeImage(key: string, id: number) {
    this.gallery[key].forEach((img, index) => {
      if (img.id === id) { this.gallery[key].splice(index, 1); }
    });
  }

}
