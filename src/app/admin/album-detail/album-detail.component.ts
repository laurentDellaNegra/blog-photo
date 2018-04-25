import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireStorage } from 'angularfire2/storage';

import { Album } from '../../shared/album.model';
import { Image } from '../../shared/image.model';
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
  uploadPercent$: Observable<number>;
  imageList$: Observable<Image[]>;
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
      this.album = { ...data.album };
      this.imageList$ = this.albumsService.getImagesInDB(this.album.id);
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

    this.uploadService.compress(this.currentUpload)
      .then((fileCompressed) => {
        const task$ = this.uploadService.upload(file, this.album.id);
        const downloadURL$ = task$.downloadURL();
        // observe percentage changes
        this.uploadPercent$ = task$.percentageChanges();
        this.uploadPercent$.subscribe({
          complete() {
            this.isUploading = false;
          }
        });
        task$.then((response) => this.uploadService.saveImagesInDB(response, this.album.id));
      });
  }

  uploadMulti() {
    const files = this.selectedFiles;
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.uploadSingle(i);
    }
  }

  deleteImageInStorage(img: Image): void {
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
