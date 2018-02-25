import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Album } from '../model/Album';
import { Photo } from '../model/Photo';

const ALBUMS = [
  {
    id: 'madagascar',
    name: 'Madagascar',
    description: 'No meratius id ius. Parteue no nam. Iusto exerci iuvaret eos ne. Mea atqui molestiae et, no sit iudicabit intellegebat.',
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
    id: 'bali',
    name: 'Bali',
    description: 'No meratius id ius. Parteue no nam. Iusto exerci iuvaret eos ne. Mea atqui molestiae et, no sit iudicabit intellegebat.',
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
    id: 'australie',
    name: 'Australie',
    description: 'Ei qui tantas fuisset detracto, facer maiestatis mei ne.',
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
    id: 'shanghai',
    name: 'Shanghai',
    description: 'Mei deserunt disputationi vituperatoribus at, et mea dicunt euismod. Et mea malorum voluptatibus.',
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
    id: 'amsterdam',
    name: 'Amsterdam',
    description: 'In omnesque consetetur mea, cu quo pertinax comprehensam, etiam praesent mei ea. ',
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
    id: 'madrid',
    name: 'Madrid',
    description: 'Sed dico dictas oportere no.',
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
    id: 'milan',
    name: 'Milan',
    description: 'No meratius id ius. Parteue no nam. Iusto exerci iuvaret eos ne. Mea atqui molestiae et, no sit iudicabit intellegebat.',
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

@Injectable()
export class AlbumsService {

  constructor() { }

  getAlbums(): Observable<Array<Album>> {
    return Observable.of(ALBUMS);
  }

  getAlbum(id: string): Observable<Album> {
    return this.getAlbums()
      .map(albums => albums.find(album => album.id === id));

  }

  // Admin feature, move this
  addAlbum(name: string): void {
    const album = new Album(name);
    ALBUMS.push(album);
  }

  deleteAlbum(id): void {
    if (id > -1) {
      ALBUMS.splice(id, 1);
    }
  }
}
