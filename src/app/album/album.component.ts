import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { AlbumsService } from '../shared/albums.service';
import { Image } from '../shared/image.model';
import { LightboxService } from '../shared/lightbox.service';
import { Image2 } from '../shared/image2.model';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  public album$: Observable<any>;
  imageList$: Observable<Image[]>;
  galleryKey: string;

  constructor(
    private route: ActivatedRoute,
    private albumsService: AlbumsService,
    private ls: LightboxService
  ) { }

  ngOnInit() {
    this.album$ = this.route.paramMap
      .switchMap((params: ParamMap) => {
        const albumId = params.get('id');
        this.imageList$ = this.albumsService.getImagesInDB(albumId);
        return this.albumsService.getAlbum(albumId);
      });

    this.ls.createGallery('galleryKey');
    const img = new Image2();
    img.largeUrl = 'https://firebasestorage.googleapis.com/v0/b/blog-photo-c92df.appspot.com/o/images%2F-LAy7Jml3itL9tzfpQhA%2F7ytkfgp86ri?alt=media&token=e8eebc9f-f02a-4e9b-9038-9724b6083f96';
    img.height = 3296;
    img.width = 4934;
    img.id = 0;
    img.size = `${img.width}x${img.height}`;
    img.thumbUrl = 'https://firebasestorage.googleapis.com/v0/b/blog-photo-c92df.appspot.com/o/images%2F-LAy7Jml3itL9tzfpQhA%2F7ytkfgp86ri?alt=media&token=e8eebc9f-f02a-4e9b-9038-9724b6083f96';
    this.ls.addImage('galleryKey', img);

    const img2: any = {};
    img2.largeUrl = 'https://firebasestorage.googleapis.com/v0/b/blog-photo-c92df.appspot.com/o/images%2F-LAy7Jml3itL9tzfpQhA%2F7ytkfgp86ri?alt=media&token=e8eebc9f-f02a-4e9b-9038-9724b6083f96';
    img2.height = 3296;
    img2.width = 4934;
    img2.id = 0;
    img2.size = `${img.width}x${img.height}`;
    img2.thumbUrl = 'https://firebasestorage.googleapis.com/v0/b/blog-photo-c92df.appspot.com/o/images%2F-LAy7Jml3itL9tzfpQhA%2F7ytkfgp86ri?alt=media&token=e8eebc9f-f02a-4e9b-9038-9724b6083f96';
    this.ls.addImage('galleryKey', img2);

    setTimeout(() => {
      this.galleryKey = 'galleryKey';
    }, 2000);
  }

  imagesLoaded(event: any) {
    console.log(event);
  }
}
