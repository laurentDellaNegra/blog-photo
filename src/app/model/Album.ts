import { Photo } from './Photo';

export class Album {
  constructor(name: string) {
    this.id = name.trim().replace(/\s+/g, '-').toLowerCase();
    this.name = name;
    this.description = 'Saisissez une description pour cet album';
    this.photos = new Array<Photo>();
  }
  id: string;
  name: string;
  description: string;
  photos: Array<Photo>;
}
