import { Component, ViewChild, ElementRef, Input } from '@angular/core';

// Import PhotoSwipe
import * as PhotoSwipe from 'photoswipe';
import * as PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';

import { ImageMetadata } from '../../shared/image-metadata.model';

@Component({
  selector: 'app-photo-swipe',
  templateUrl: './photo-swipe.component.html',
  styleUrls: ['./photo-swipe.component.css']
})
export class PhotoSwipeComponent {
  @ViewChild('photoSwipe') photoSwipe: ElementRef;

  @Input() images: ImageMetadata[] = [];

  constructor() { }

  openGallery(images?: ImageMetadata[], id: number = 0) {
    // Build gallery images array
    images = images || this.images;

    // define options (if needed)
    const options = {
      // optionName: 'option value'
      // for example:
      index: id // start at first slide
    };

    // Initializes and opens PhotoSwipe
    const gallery = new PhotoSwipe(this.photoSwipe.nativeElement, PhotoSwipeUI_Default, images, options);
    gallery.init();
  }
}
