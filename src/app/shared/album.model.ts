import { Image } from './image.model';

export class Album {
  constructor() {
    this.description = 'Saisissez une description pour cet album';
  }
  id: string;
  name: string;
  description: string;
  images: any;
}
