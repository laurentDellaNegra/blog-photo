import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import PhotoSwipe from 'photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';
import { NgProgress } from '@ngx-progressbar/core';

import { AlbumsService } from '../shared/albums.service';
import { ImageMetadata } from '../shared/image-metadata.model';
import { PhotoSwipeComponent } from './photo-swipe/photo-swipe.component';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  public album$: Observable<any>;
  imageList: ImageMetadata[];
  galleryKey: string;
  @ViewChild('photoSwipe') photoSwipe: PhotoSwipeComponent;

  constructor(
    private route: ActivatedRoute,
    private albumsService: AlbumsService,
    public progress: NgProgress
  ) { }

  ngOnInit() {
    this.progress.start();
    this.album$ = this.route.paramMap
      .switchMap((params: ParamMap) => {
        const albumId = params.get('id');
        this.albumsService.getImagesInDB(albumId)
          .subscribe((images: ImageMetadata[]) => {
            this.imageList = images;
          });
        return this.albumsService.getAlbum(albumId);
      });
  }

  openSlideshow(index?: number) {
    this.photoSwipe.openGallery(this.imageList, index);
  }

}
