import { Injectable } from '@angular/core';

@Injectable()
export class AlbumsService {

  private albums = [
    {
      id: 'madagascar',
      name: 'Madagascar',
      description: 'Lorem ipsum dolor sit amet, pro eu magna epicuri, dicunt bonorum quaestio cu his. Ei has nostrud dolorem conclusionemque, cu qui eius iusto utroque.',
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
      description: 'Nullam iuvaret no quo, nec in rebum electram, ad veritus atomorum splendide pro. Nobis graeco sententiae ad quo, oratio denique nec in, mentitum placerat est ex.',
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
      description: 'No mea mucius dolorum postulant, reque eripuit neglegentur per et, mazim legimus moderatius id ius. Partem insolens vix id, te cum affert disputando. Reprimique signiferumque no nam. Iusto exerci iuvaret eos ne. Mea atqui molestiae et, no sit iudicabit intellegebat.',
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
      if (album.id === id) {
        return album;
      }
    }
  }
}
