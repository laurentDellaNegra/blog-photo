import { Injectable } from '@angular/core';

@Injectable()
export class AlbumsService {

  private albums = [
    {
      name: 'Madagascar',
      description: 'Madagascar la petite île d\'Afrique',
      photos: [
        {
          name: 'toto',
          url: 'toto'
        },
        {
          name: 'toto2',
          url: 'toto2'
        },
        {
          name: 'toto3',
          url: 'toto3'
        }
      ]
    },
    {
      name: 'Baly',
      description: 'C cool Baly',
      photos: [
        {
          name: 'toto',
          url: 'toto'
        },
        {
          name: 'toto2',
          url: 'toto2'
        },
        {
          name: 'toto3',
          url: 'toto3'
        }
      ]
    }
    {
      name: 'Australie',
      description: 'C cool l\'Australie',
      photos: [
        {
          name: 'toto',
          url: 'toto'
        },
        {
          name: 'toto2',
          url: 'toto2'
        },
        {
          name: 'toto3',
          url: 'toto3'
        }
      ]
    }
  ];

  constructor() { }

  getAlbums(): Array<any> {
    return this.albums;
  }

  getAlbum(id: string) {
    for (const album of this.albums) {
      if (album.name === id) {
        return album;
      }
    }
  }
}
