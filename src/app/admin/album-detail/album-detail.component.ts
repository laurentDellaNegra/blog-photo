import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireStorage } from 'angularfire2/storage';

import { Album } from '../../model/Album';

interface Image {
  path: string;
  filename: string;
  downloadUrl?: string;
  $key?: string;
}

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css']
})
export class AlbumDetailComponent implements OnInit {

  album: Album;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  imageList: Observable<Image[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storage: AngularFireStorage) { }

  ngOnInit() {
    this.route.data.subscribe((data: { album: Album }) => {
      this.album = { ...data.album };
    });
  }

  uploadFile(event) {
    // create a random id
    const randomId = Math.random().toString(36).substring(2);

    // create a reference to the storage bucket location
    const ref = this.storage.ref(randomId);

    const file = event.target.files[0];
    const filePath = 'name-your-file-path-here';
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    this.downloadURL = task.downloadURL();
  }

  save() {

  }

}
