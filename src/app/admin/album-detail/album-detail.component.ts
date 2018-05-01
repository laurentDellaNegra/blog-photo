import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireStorage } from 'angularfire2/storage';

import { Album } from '../../shared/album.model';
import { ImageMetadata } from '../../shared/image-metadata.model';
import { UploadService } from '../shared/upload.service';
import { Upload } from '../shared/upload.model';

import { AlbumsService } from '../../shared/albums.service';
import { AlbumAdminService } from '../shared/album-admin.service';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css']
})
export class AlbumDetailComponent implements OnInit {

  album: Album;
  imageList: ImageMetadata[];
  isUploading = false;
  selectedFiles: FileList;
  currentUpload: Upload;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storage: AngularFireStorage,
    private uploadService: UploadService,
    private albumsService: AlbumsService,
    private albumAdminService: AlbumAdminService
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: { album: Album }) => {
      this.albumsService.getAlbum(data.album.id)
        .subscribe((album: Album) => {
          this.album = album;
        });
      this.albumsService.getImagesInDB(data.album.id)
        .subscribe((images: ImageMetadata[]) => {
          this.imageList = images;
        });
    });

  }

  upload(event) {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles.length > 1) {
      this.uploadMulti();
    } else {
      this.uploadSingle(0);
    }
  }

  uploadSingle(indexFile): void {
    const file = this.selectedFiles.item(indexFile);
    this.currentUpload = new Upload(file);
    this.isUploading = true;

    this.uploadService.upload(this.currentUpload, this.album.id)
      .then(() => {
        this.isUploading = false;
      });

  }

  uploadMulti() {
    const files = this.selectedFiles;
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.uploadSingle(i);
    }
  }

  deleteImageInStorage(img: ImageMetadata): void {
    this.albumAdminService.deleteImage(img)
      .then(() => console.log('Image deleted'))
      .catch(reason => console.log(reason));
  }

  save() {
    this.albumAdminService.editAlbum(this.album)
      .then(() => console.log('Album updated'))
      .catch(err => console.log(err));
  }
}
