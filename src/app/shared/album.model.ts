import { Image } from './image.model';

export class Album {
  constructor(name: string) {
    this.id = name.trim().replace(/\s+/g, '-').toLowerCase();
    this.name = name;
    this.description = 'Saisissez une description pour cet album';
  }
  id: string;
  name: string;
  description: string;
  images: any;
}
