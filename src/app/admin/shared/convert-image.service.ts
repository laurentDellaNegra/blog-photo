import { Injectable } from '@angular/core';
import ImageCompressor from 'image-compressor.js';

@Injectable()
export class ConvertImageService {

  private imageCompressor: ImageCompressor;

  compress(file): Promise<Blob> {
    this.imageCompressor = new ImageCompressor();
    const options = {
      quality: 0.6
    };
    return this.imageCompressor.compress(file, options);
  }
}
