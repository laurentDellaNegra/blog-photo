import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { BehaviorSubject, Observable } from 'rxjs';
// import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';
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

  images$ = new BehaviorSubject([]);

  public album$: Observable<any>;
  imageList: ImageMetadata[];
  albumId: string;

  batch = 8; // size of each query
  lastKey = ''; // key to offset next query from
  finished = false; // Boolean when end of db is reached

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
        this.albumId = params.get('id');
        // complete list
        this.albumsService.getImagesInDB(this.albumId)
          .subscribe((images: ImageMetadata[]) => {
            this.imageList = images;
          });
        // images on scroll
        this.getImages();
        return this.albumsService.getAlbum(this.albumId);
      });
  }

  openSlideshow(index?: number) {
    this.photoSwipe.openGallery(this.imageList, index);
  }

  onScroll() {
    this.getImages();
  }

  private getImages(key?) {
    if (this.finished) {
      return;
    }
    this.albumsService.getImagesInDBPaginated(this.albumId, this.batch + 8, this.lastKey)
      .subscribe(images => {

        if (images.length) {

          // set the lastkey in preparation for next query
          this.lastKey = images[images.length - 1]['id'];
          const newImages = images.slice(0, this.batch);

          // Get current images in behavior
          const currentImages = this.images$.getValue();

          // If data is identical stop making queries
          if (this.lastKey === newImages[newImages.length - 1]['id']) {
            this.finished = true;
          }

          // Concatenate new images to current images
          this.images$.next(currentImages.concat(newImages));
        }
      });

  }
}
