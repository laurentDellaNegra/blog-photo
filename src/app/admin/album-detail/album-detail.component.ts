import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireStorage } from 'angularfire2/storage';

import { Album } from '../../model/Album';
import { UploadService } from '../shared/upload.service';
import { Upload } from '../shared/upload';

import { AlbumsService } from '../../services/albums.service';
import { Image } from "../../model/Image";

// interface Image {
//   path: string;
//   filename: string;
//   downloadUrl?: string;
//   $key?: string;
// }

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css']
})
export class AlbumDetailComponent implements OnInit {

  album: Album;
  uploadPercentObservable: Observable<number>;
  uploadPercent: number;
  downloadURL: Observable<string>;
  imageList: Observable<Image[]>;
  isUploading = false;
  selectedFiles: FileList;
  currentUpload: Upload;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storage: AngularFireStorage,
    private uploadService: UploadService,
    private albumsService: AlbumsService) { }

  ngOnInit() {
    this.route.data.subscribe((data: { album: Album }) => {
      this.album = { ...data.album };
    });

    this.imageList = this.albumsService.getImages();
    console.log(this.imageList);
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
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
    const task = this.uploadService.pushUpload(this.currentUpload, this.album.id);

    // observe percentage changes
    this.uploadPercentObservable = task.percentageChanges();
    this.uploadPercentObservable.subscribe({
      next(nb) { this.uploadPercent = nb; },
      complete() {
        this.isUploading = false;

      }
    });

    // get notified when the download URL is available
    this.downloadURL = task.downloadURL();
  }

  uploadMulti() {
    const files = this.selectedFiles;
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.uploadSingle(i);
    }
  }

  save() {
    this.uploadService.getImages();
  }

}
