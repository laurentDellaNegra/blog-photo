import { Injectable } from '@angular/core';

@Injectable()
export class ConvertImageService {

  constructor() { }

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
    const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return { width: srcWidth * ratio, height: srcHeight * ratio };
  }

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
  }

  private getBase64(file): any {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      return reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  // return a promise that resolves with a File instance
  private urltoFile(url, filename, mimeType) {
    return (fetch(url)
      .then(function (res) { return res.arrayBuffer(); })
      .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
    );
  }
}
